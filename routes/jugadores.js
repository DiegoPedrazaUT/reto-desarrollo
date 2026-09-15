const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Consultar todos los jugadores o buscar por coincidencia
router.get('/', async (req, res) => {
    const { busqueda } = req.query; 

    try {
        if (busqueda) {
            const [jugadores] = await pool.query(
                `SELECT id, nombre, gamertag, correo, fecha_registro 
                 FROM jugadores 
                 WHERE nombre LIKE ? OR gamertag LIKE ?`,
                [`%${busqueda}%`, `%${busqueda}%`]
            );
            return res.status(200).json(jugadores);
        } else {
            const [jugadores] = await pool.query(
                'SELECT id, nombre, gamertag, correo, fecha_registro FROM jugadores'
            );
            return res.status(200).json(jugadores);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno al consultar los jugadores.' });
    }
});

// POST: Registrar un nuevo jugador con validaciones estrictas
router.post('/', async (req, res) => {
    let { nombre, gamertag, correo } = req.body;

    // Limpieza de datos
    nombre = nombre?.trim();
    gamertag = gamertag?.trim();
    correo = correo?.trim();

    // Validación de campos vacíos
    if (!nombre || !gamertag || !correo) {
        return res.status(400).json({ error: 'Nombre, gamertag y correo son obligatorios y no pueden estar vacíos.' });
    }

    // Validación de longitud
    if (nombre.length > 100 || gamertag.length > 50 || correo.length > 150) {
        return res.status(400).json({ error: 'Uno de los campos excede el límite de caracteres permitido.' });
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
    }

    try {
        // Buscar si el gamertag o el correo ya existen
        const [duplicados] = await pool.query(
            'SELECT gamertag, correo FROM jugadores WHERE gamertag = ? OR correo = ?',
            [gamertag, correo]
        );

        if (duplicados.length > 0) {
            const jugadorExistente = duplicados[0];
            if (jugadorExistente.gamertag === gamertag) {
                return res.status(409).json({ error: 'Error: El gamertag ya está registrado en el torneo.' });
            }
            if (jugadorExistente.correo === correo) {
                return res.status(409).json({ error: 'Error: Este correo electrónico ya está en uso por otro jugador.' });
            }
        }

        // Insertar el nuevo jugador
        const [result] = await pool.query(
            'INSERT INTO jugadores (nombre, gamertag, correo) VALUES (?, ?, ?)',
            [nombre, gamertag, correo]
        );
        
        res.status(201).json({ 
            mensaje: 'Jugador registrado exitosamente', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al registrar el jugador.' });
    }
});

module.exports = router;