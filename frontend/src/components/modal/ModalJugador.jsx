import React from 'react';

export default function ModalJugador({ onClose }) {
  // Función temporal para evitar que el form recargue la página
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando datos del jugador...");
    // Aquí conectaremos con el servicio más adelante
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