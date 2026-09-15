import React from 'react';

export default function ModalVideojuego({ onClose }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/videojuegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(result.mensaje); // Éxito
        onClose();
      } else {
        alert(result.error); // Error (ej. Nombre duplicado)
      }
    } catch (error) {
      console.error("Error al registrar videojuego:", error);
    }
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