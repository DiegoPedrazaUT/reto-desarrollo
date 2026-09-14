import React, { useState, useEffect } from 'react';

export default function PanelEstadisticas() {
  const [stats, setStats] = useState({
    total_jugadores: 0,
    total_videojuegos: 0,
    total_puntuaciones: 0,
    promedio_puntuacion: 0
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/estadisticas')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error al cargar estadísticas:", err));
  }, []);

  return (
    <div className="panel-estadisticas">
      {/* Actualiza las variables para que coincidan con la respuesta del backend */}
      <div className="tarjeta-stat"><span>Jugadores</span><span>{stats.total_jugadores}</span></div>
      <div className="tarjeta-stat"><span>Videojuegos</span><span>{stats.total_videojuegos}</span></div>
      <div className="tarjeta-stat"><span>Puntuaciones</span><span>{stats.total_puntuaciones}</span></div>
      <div className="tarjeta-stat"><span>Promedio</span><span>{stats.promedio_puntuacion}</span></div>
    </div>
  );
}