import React from 'react';

export default function TablaJugadores({ busqueda }) {
  // Datos simulados temporales.
  const mockJugadores = [
    { id: 1, gamertag: 'Shadow', nombre: 'Alex Mercer', correo: 'alex@ejemplo.com', fecha: '2026-09-09' },
    { id: 2, gamertag: 'Nova', nombre: 'Sam Aran', correo: 'sam@ejemplo.com', fecha: '2026-09-08' },
    { id: 3, gamertag: 'Ghost', nombre: 'Simon Riley', correo: 'simon@ejemplo.com', fecha: '2026-09-09' },
  ];

  // Lógica de filtrado por Nombre o Gamertag[cite: 1]
  const datosFiltrados = mockJugadores.filter(jugador => 
    jugador.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    jugador.gamertag.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="tabla-responsive">
      <table className="tabla-ui">
        <thead>
          <tr>
            {/* Solo las columnas exigidas en el RF04[cite: 1] */}
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
                <td>{item.fecha}</td>
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