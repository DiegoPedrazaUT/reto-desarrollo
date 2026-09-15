import React, { useState, useEffect } from 'react';

export default function TablaJugadores({ busqueda }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/jugadores')
      .then(res => res.json())
      .then(data => setJugadores(data))
      .catch(err => console.error("Error al cargar la tabla:", err));
  }, []);

  // RF07: El filtro sigue buscando por nombre o gamertag internamente
  const datosFiltrados = jugadores.filter(jugador => {
    const nombre = jugador.nombre || ''; 
    const gamertag = jugador.gamertag || '';
    
    return nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
           gamertag.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="tabla-responsive">
      <table className="tabla-ui">
        <thead>
          <tr>
            {/* RF04: Estrictamente 3 columnas */}
            <th>Gamertag</th>
            <th>Correo</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.length > 0 ? (
            datosFiltrados.map((item) => (
              <tr key={item.id}>
                <td className="col-destacada">{item.gamertag}</td>
                <td className="col-secundaria">{item.correo}</td>
                <td>{item.fecha_registro.substring(0, 10)}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="sin-resultados">
                No se encontraron jugadores.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}