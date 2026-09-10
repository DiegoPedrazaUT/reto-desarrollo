import React from 'react';

export default function ModalVideojuego({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando datos del videojuego...");
    // Pendiente: Conexión con el backend para validar que no existan nombres duplicados
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Nuevo Videojuego</h3>
        
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <label htmlFor="nombre">Nombre del Videojuego *</label>
            <input type="text" id="nombre" name="nombre" required placeholder="Ej. Tekken 8" />
          </div>

          <div className="campo">
            <label htmlFor="genero">Género *</label>
            <input type="text" id="genero" name="genero" required placeholder="Ej. Peleas, FPS, Carreras" />
          </div>

          <div className="acciones-form">
            <button type="button" className="btn-cerrar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar Videojuego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}