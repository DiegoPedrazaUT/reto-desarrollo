import React, { useState, useEffect } from 'react';

export default function ModalPuntuacion({ onClose }) {
  const [jugadores, setJugadores] = useState([]);
  const [juegos, setJuegos] = useState([]);

  // Variables para enviar al backend
  const [jugadorId, setJugadorId] = useState('');
  const [videojuegoId, setVideojuegoId] = useState('');
  const [puntuacion, setPuntuacion] = useState('');

  useEffect(() => {
    // Cargar Jugadores
    fetch('http://localhost:3000/api/jugadores')
      .then(res => res.json())
      .then(data => setJugadores(data));
      
    // Cargar Videojuegos
    fetch('http://localhost:3000/api/videojuegos')
      .then(res => res.json())
      .then(data => setJuegos(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/puntuaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jugador_id: parseInt(jugadorId),
          videojuego_id: parseInt(videojuegoId),
          puntuacion: parseInt(puntuacion)
        })
      });
      
      const result = await response.json();
      if (response.ok) {
        alert(result.mensaje);
        onClose();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Puntuación</h3>
        
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <label>Seleccionar Jugador *</label>
            <select required value={jugadorId} onChange={(e) => setJugadorId(e.target.value)}>
              <option value="">-- Elige un jugador --</option>
              {jugadores.map((j, i) => (
                <option key={i} value={j.id || j.gamertag}>{j.gamertag}</option> 
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Seleccionar Videojuego *</label>
            <select required value={videojuegoId} onChange={(e) => setVideojuegoId(e.target.value)}>
              <option value="">-- Elige un videojuego --</option>
              {juegos.map(v => (
                <option key={v.id} value={v.id}>{v.nombre}</option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Puntuación *</label>
            <input 
              type="number" min="0" required 
              value={puntuacion} onChange={(e) => setPuntuacion(e.target.value)}
            />
          </div>

          <div className="acciones-form">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}