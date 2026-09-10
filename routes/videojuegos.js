const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { nombre, genero } = req.body;

    if (!nombre || !genero) {
        return res.status(400).json({ error: 'Nombre y género son obligatorios.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO videojuegos (nombre, genero) VALUES (?, ?)',
            [nombre, genero]
        );
        
        res.status(201).json({ 
            mensaje: 'Videojuego registrado exitosamente', 
            id: result.insertId 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Error: No deberán existir dos videojuegos con el mismo nombre.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al registrar el videojuego.' });
    }
});



router.get('/', async (req, res) => {
    try {
        // Consulta sencilla para alimentar el formulario del Frontend
        const [videojuegos] = await pool.query('SELECT id, nombre, genero FROM videojuegos');
        return res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al consultar los videojuegos.' });
    }
});

module.exports = router;