const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { jugador_id, videojuego_id, puntuacion } = req.body;

    // Validación de datos completos
    if (!jugador_id || !videojuego_id || puntuacion === undefined) {
        return res.status(400).json({ error: 'Jugador, videojuego y puntuación son obligatorios.' });
    }

    // Regla de negocio estricta: No puntuaciones negativas
    if (puntuacion < 0) {
        return res.status(400).json({ error: 'La puntuación no puede ser negativa.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO puntuaciones (jugador_id, videojuego_id, puntuacion) VALUES (?, ?, ?)',
            [jugador_id, videojuego_id, puntuacion]
        );
        
        // Mensaje claro indicando que la operación fue correcta
        res.status(201).json({ 
            mensaje: 'Puntuación registrada exitosamente', 
            id: result.insertId 
        });
    } catch (error) {
        // Validación de existencia cruzada mediante llaves foráneas
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(404).json({ error: 'Error: El jugador o el videojuego seleccionado no existen en el sistema.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al registrar la puntuación.' });
    }
});

module.exports = router;