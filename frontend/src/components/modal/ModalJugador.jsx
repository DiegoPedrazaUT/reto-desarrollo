import React from 'react';

export default function ModalJugador({ onClose }) {
  // Función temporal para evitar que el form recargue la página
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Captura los datos del formulario automáticamente
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/jugadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(result.mensaje); // Éxito
        onClose(); // Cierra el modal
      } else {
        alert(result.error); // Muestra error (ej. Gamertag duplicado)
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Nuevo Jugador</h3>
        
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input type="text" id="nombre" name="nombre" required placeholder="Ej. Alex Mercer" />
          </div>

          <div className="campo">
            <label htmlFor="gamertag">Gamertag o Alias *</label>
            <input type="text" id="gamertag" name="gamertag" required placeholder="Ej. Shadow" />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo Electrónico *</label>
            <input type="email" id="correo" name="correo" required placeholder="alex@ejemplo.com" />
          </div>

          <div className="acciones-form">
            <button type="button" className="btn-cerrar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar Jugador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}