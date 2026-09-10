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

module.exports = router;