import React from 'react';

export default function PanelEstadisticas() {
  // Datos simulados temporales (más adelante se calcularán con la información de MySQL)
  const stats = {
    totalJugadores: 15,
    totalVideojuegos: 8,
    totalPuntuaciones: 42,
    promedio: 785
  };

  return (
    <div className="panel-estadisticas">
      <div className="tarjeta-stat">
        <span className="stat-label">Jugadores Totales</span>
        <span className="stat-valor">{stats.totalJugadores}</span>
      </div>
      <div className="tarjeta-stat">
        <span className="stat-label">Videojuegos</span>
        <span className="stat-valor">{stats.totalVideojuegos}</span>
      </div>
      <div className="tarjeta-stat">
        <span className="stat-label">Puntuaciones Registradas</span>
        <span className="stat-valor">{stats.totalPuntuaciones}</span>
      </div>
      <div className="tarjeta-stat">
        <span className="stat-label">Puntuación Promedio</span>
        <span className="stat-valor">{stats.promedio}</span>
      </div>
    </div>
  );
}