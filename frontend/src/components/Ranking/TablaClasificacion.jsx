import React, { useState } from 'react';

export default function TablaClasificacion() {
  // Datos simulados temporales para estructurar la tabla
  const mockDatos = [
    { id: 1, gamertag: 'Shadow', nombre: 'Alex Mercer', correo: 'alex@ejemplo.com', fecha: '2026-09-09', videojuego: 'Tekken', puntuacion: 950 },
    { id: 2, gamertag: 'Nova', nombre: 'Sam Aran', correo: 'sam@ejemplo.com', fecha: '2026-09-08', videojuego: 'Tekken', puntuacion: 820 },
    { id: 3, gamertag: 'Ghost', nombre: 'Simon Riley', correo: 'simon@ejemplo.com', fecha: '2026-09-09', videojuego: 'Tekken', puntuacion: 760 },
  ];

  const [busqueda, setBusqueda] = useState('');

  // Lógica de filtrado: buscar coincidencias por Nombre o Gamertag
  const datosFiltrados = mockDatos.filter(jugador => 
    jugador.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    jugador.gamertag.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica de ordenamiento: mostrar clasificación de mayor a menor puntuación[cite: 1]
  const datosOrdenados = datosFiltrados.sort((a, b) => b.puntuacion - a.puntuacion);

  return (
    <div className="contenedor-clasificacion">
      
      {/* Barra de Búsqueda (RF07) */}
      <div className="barra-busqueda">
        <input 
          type="text" 
          placeholder="Buscar jugador por Nombre o Gamertag..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla de Resultados */}
      <div className="tabla-responsive">
        <table className="tabla-ui">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Gamertag</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha Registro</th>
              <th>Videojuego</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {datosOrdenados.length > 0 ? (
              datosOrdenados.map((item, index) => (
                <tr key={item.id}>
                  <td className="col-posicion">#{index + 1}</td>
                  <td className="col-destacada">{item.gamertag}</td>
                  <td>{item.nombre}</td>
                  <td className="col-secundaria">{item.correo}</td>
                  <td className="col-secundaria">{item.fecha}</td>
                  <td>{item.videojuego}</td>
                  <td className="col-puntuacion">{item.puntuacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="sin-resultados">
                  No se encontraron jugadores con esa búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}