import React, { useState, useEffect } from 'react';

export default function TablaClasificacion({ busqueda }) {
  const [datos, setDatos] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/puntuaciones')
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error al cargar ranking:", err));
  }, []);

  const terminoBusqueda = busqueda || '';

  const datosFiltrados = datos.filter(item => {
    const gamertag = item.jugador || '';
    const nombre = item.nombreJugador || ''; 
    const videojuego = item.videojuego || '';
    const termino = terminoBusqueda.toLowerCase();

    return gamertag.toLowerCase().includes(termino) || 
           nombre.toLowerCase().includes(termino) || 
           videojuego.toLowerCase().includes(termino);
  });

  return (
    <div className="contenedor-clasificacion">
      <div className="tabla-responsive">
        <table className="tabla-ui">
          <thead>
            <tr>
              {/* Respetando estrictamente el RF06 */}
              <th>Posición</th>
              <th>Jugador (Gamertag)</th>
              <th>Videojuego</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.length > 0 ? (
              datosFiltrados.map((item, index) => (
                <tr key={index}>
                  <td className="col-posicion">#{index + 1}</td>
                  <td className="col-destacada">{item.jugador}</td>
                  <td>{item.videojuego}</td>
                  <td className="col-puntuacion">{item.puntuacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="sin-resultados">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}