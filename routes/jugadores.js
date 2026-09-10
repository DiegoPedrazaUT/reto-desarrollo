const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { nombre, gamertag, correo } = req.body;

    // Validación del backend requerida por el sistema
    if (!nombre || !gamertag || !correo) {
        return res.status(400).json({ error: 'Nombre, gamertag y correo son obligatorios.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO jugadores (nombre, gamertag, correo) VALUES (?, ?, ?)',
            [nombre, gamertag, correo]
        );
        
        // Mensaje claro de éxito para la interfaz
        res.status(201).json({ 
            mensaje: 'Jugador registrado exitosamente', 
            id: result.insertId 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Error: El gamertag ya está registrado en el torneo.' });
        }
        console.error("ERROR REAL DE MYSQL:", error); 
        res.status(500).json({ error: 'Error interno del servidor al registrar el jugador.' });
    }
});


router.get('/', async (req, res) => {
    const { busqueda } = req.query; // Captura el parámetro de la URL (ej. ?busqueda=Felipe)

    try {
        if (busqueda) {
            // RF07: Buscar coincidencias por nombre o gamertag
            const [jugadores] = await pool.query(
                `SELECT id, nombre, gamertag, correo, fecha_registro 
                 FROM jugadores 
                 WHERE nombre LIKE ? OR gamertag LIKE ?`,
                [`%${busqueda}%`, `%${busqueda}%`]
            );
            return res.status(200).json(jugadores);
        } else {
            // RF04: Consultar todos los jugadores registrados
            const [jugadores] = await pool.query(
                'SELECT gamertag, correo, fecha_registro FROM jugadores'
            );
            return res.status(200).json(jugadores);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno al consultar los jugadores.' });
    }
});

module.exports = router;