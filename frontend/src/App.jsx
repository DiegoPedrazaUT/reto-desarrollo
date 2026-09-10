import { useState } from 'react'
import './App.css'
import ModalJugador from './components/modal/ModalJugador';
import ModalVideojuego from './components/modal/ModalVideojuego';
import ModalPuntuaciones from './components/modal/ModalPuntuaciones';
import TablaClasificacion from './components/Ranking/TablaClasificacion';

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
          <TablaClasificacion />
        </div>
      </section>
      
      {modalActivo === 'jugador' && (
        <ModalJugador onClose={() => setModalActivo(null)} />
      )}
      
      {modalActivo === 'videojuego' && (
        <ModalVideojuego onClose={() => setModalActivo(null)} />
      )}

      {modalActivo === 'puntuacion' && (
        <ModalPuntuaciones onClose={() => setModalActivo(null)} />
      )}

    </main>
  )
}

export default App