import React, { useState } from 'react';

export default function ModalPuntuacion({ onClose }) {
  // Datos simulados temporales.
  const mockJugadores = ['Shadow', 'Nova', 'Ghost'];
  const mockJuegos = ['Tekken', 'Street Fighter', 'Halo'];

  const [jugador, setJugador] = useState('');
  const [juego, setJuego] = useState('');
  const [puntuacion, setPuntuacion] = useState('');

  // Estados para controlar si se muestra la lista desplegable
  const [mostrarJugadores, setMostrarJugadores] = useState(false);
  const [mostrarJuegos, setMostrarJuegos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrando puntuación:", { jugador, juego, puntuacion });
    // Pendiente: Validar y enviar al backend
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Puntuación</h3>
        
        <form onSubmit={handleSubmit} className="formulario">
          
          {/* Buscador de Jugador */}
          <div className="campo relativo">
            <label htmlFor="jugador">Jugador *</label>
            <input 
              type="text" 
              id="jugador" 
              value={jugador}
              onChange={(e) => {
                setJugador(e.target.value);
                setMostrarJugadores(true);
              }}
              onFocus={() => setMostrarJugadores(true)}
              onBlur={() => setTimeout(() => setMostrarJugadores(false), 200)} // Retraso para permitir hacer clic
              required 
              placeholder="Buscar gamertag..." 
              autoComplete="off"
            />
            {mostrarJugadores && jugador && (
              <ul className="lista-resultados">
                {mockJugadores
                  .filter(j => j.toLowerCase().includes(jugador.toLowerCase()))
                  .map((j, i) => (
                    <li key={i} onClick={() => { setJugador(j); setMostrarJugadores(false); }}>
                      {j}
                    </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buscador de Videojuego */}
          <div className="campo relativo">
            <label htmlFor="juego">Videojuego *</label>
            <input 
              type="text" 
              id="juego" 
              value={juego}
              onChange={(e) => {
                setJuego(e.target.value);
                setMostrarJuegos(true);
              }}
              onFocus={() => setMostrarJuegos(true)}
              onBlur={() => setTimeout(() => setMostrarJuegos(false), 200)}
              required 
              placeholder="Buscar videojuego..." 
              autoComplete="off"
            />
            {mostrarJuegos && juego && (
              <ul className="lista-resultados">
                {mockJuegos
                  .filter(j => j.toLowerCase().includes(juego.toLowerCase()))
                  .map((j, i) => (
                    <li key={i} onClick={() => { setJuego(j); setMostrarJuegos(false); }}>
                      {j}
                    </li>
                ))}
              </ul>
            )}
          </div>

          {/* Puntuación */}
          <div className="campo">
            <label htmlFor="puntuacion">Puntuación *</label>
            <input 
              type="number" 
              id="puntuacion" 
              min="0" /* Evita puntuaciones negativas directamente en el HTML (RF03)[cite: 1] */
              value={puntuacion}
              onChange={(e) => setPuntuacion(e.target.value)}
              required 
              placeholder="0" 
            />
          </div>

          <div className="acciones-form">
            <button type="button" className="btn-cerrar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar Puntuación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}