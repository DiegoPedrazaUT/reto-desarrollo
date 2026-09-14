import React, { useState, useEffect } from 'react';

export default function TablaClasificacion() {
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  // Cargar el ranking desde MySQL al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/api/puntuaciones')
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error al cargar ranking:", err));
  }, []);

  // Filtrar por gamertag (jugador) o videojuego
  const datosFiltrados = datos.filter(item => 
    item.jugador.toLowerCase().includes(busqueda.toLowerCase()) || 
    item.videojuego.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor-clasificacion">
      <div className="barra-busqueda">
        <input 
          type="text" 
          placeholder="Buscar jugador..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

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