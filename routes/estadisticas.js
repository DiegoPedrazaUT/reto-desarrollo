const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_estadisticas()');
        let estadisticas = rows[0][0];
        
        // Parsear el string y fijar 2 decimales, convirtiéndolo de nuevo a número
        estadisticas.promedio_puntuacion = Number(parseFloat(estadisticas.promedio_puntuacion).toFixed(2));
        
        return res.status(200).json(estadisticas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al consultar las estadísticas.' });
    }
});

module.exports = router;