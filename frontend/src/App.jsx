import { useState } from 'react'
import './App.css'

function App() {
  // Estado para controlar qué modal está abierto (null = ninguno)
  const [modalActivo, setModalActivo] = useState(null)

  return (
    <main className="app-container">
      <header className="header">
        <h1>Torneo Express</h1>
        
        <nav className="nav-buttons">
          <button onClick={() => setModalActivo('jugador')}>
            Registrar Jugador
          </button>
          <button onClick={() => setModalActivo('videojuego')}>
            Registrar Videojuego
          </button>
          <button onClick={() => setModalActivo('puntuacion')}>
            Registrar Puntuación
          </button>
        </nav>
      </header>

      <section className="ranking-section">
        <h2>Clasificación General</h2>
        {/* Aquí importaremos el componente de la tabla para mostrar la clasificación ordenada de mayor a menor */}
        <div className="placeholder-tabla">
          <p>[Espacio reservado para la Tabla de Clasificación]</p>
        </div>
      </section>

      {/* Renderizado condicional de los Modales */}
      {modalActivo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modalActivo === 'jugador' && 'Formulario: Nuevo Jugador'}
              {modalActivo === 'videojuego' && 'Formulario: Nuevo Videojuego'}
              {modalActivo === 'puntuacion' && 'Formulario: Nueva Puntuación'}
            </h3>
            
            {/* Aquí importaremos los componentes de UI exactos para cada formulario */}
            <div className="placeholder-formulario">
               <p>Los campos de registro se renderizarán aquí.</p>
            </div>
            
            <button className="btn-cerrar" onClick={() => setModalActivo(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App