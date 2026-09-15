const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Consultar todos los videojuegos para el frontend
router.get('/', async (req, res) => {
    try {
        const [videojuegos] = await pool.query('SELECT id, nombre, genero FROM videojuegos');
        return res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al consultar los videojuegos.' });
    }
});

// POST: Registrar un videojuego con validaciones estrictas
router.post('/', async (req, res) => {
    let { nombre, genero } = req.body;

    // Limpieza de datos
    nombre = nombre?.trim();
    genero = genero?.trim();

    // Validación de campos vacíos
    if (!nombre || !genero) {
        return res.status(400).json({ error: 'Nombre y género son obligatorios y no pueden estar vacíos.' });
    }

    // Validación de longitud
    if (nombre.length > 100 || genero.length > 50) {
        return res.status(400).json({ error: 'El nombre o género excede el límite de caracteres permitido.' });
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

module.exports = router;