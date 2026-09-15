import React, { useState, useEffect } from 'react';

// 1. Recibe 'busqueda' como propiedad desde App.jsx
export default function TablaClasificacion({ busqueda }) {
  const [datos, setDatos] = useState([]);
  
  // Cargar el ranking desde MySQL al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/api/puntuaciones')
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error al cargar ranking:", err));
  }, []);

  // Aseguramos que 'busqueda' sea un string válido antes de filtrar
  const terminoBusqueda = busqueda || '';

  // Filtrar por gamertag (jugador) o videojuego
  const datosFiltrados = datos.filter(item => 
    item.jugador.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
    item.videojuego.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div className="contenedor-clasificacion">
      {/* SE ELIMINÓ LA BARRA DE BÚSQUEDA INTERNA PORQUE AHORA ESTÁ EN APP.JSX */}

      <div className="tabla-responsive">
        <table className="tabla-ui">
          <thead>
            <tr>
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