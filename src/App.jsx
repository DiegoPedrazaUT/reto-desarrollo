import { useState } from 'react'
import './App.css'
import ModalJugador from './components/modal/ModalJugador';
import ModalVideojuego from './components/modal/ModalVideojuego';
import ModalPuntuaciones from './components/modal/ModalPuntuaciones';
import TablaClasificacion from './components/Ranking/TablaClasificacion';
import TablaJugadores from './components/Ranking/TablaJugadores'; // <-- Importamos la nueva tabla
import PanelEstadisticas from './components/Estadisticas/PanelEstadisticas';

function App() {
  // Estado para controlar qué modal está abierto (null = ninguno)
  const [modalActivo, setModalActivo] = useState(null)

  // NUEVOS ESTADOS: Para controlar la vista y la búsqueda
  const [vistaTabla, setVistaTabla] = useState('ranking');
  const [busqueda, setBusqueda] = useState('');

  return (

      <div className="tv-marco">

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

          <PanelEstadisticas />

          <section className="ranking-section">
            {/* ENCABEZADO CON BUSCADOR Y SELECTOR DE VISTA */}
            <div className="encabezado-tablas">
              <h2>{vistaTabla === 'ranking' ? 'Clasificación General' : 'Jugadores Registrados'}</h2>

              <div className="controles-tabla">
                <input
                  type="text"
                  placeholder="Buscar por nombre o gamertag..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="input-busqueda"
                />
                <select
                  value={vistaTabla}
                  onChange={(e) => setVistaTabla(e.target.value)}
                  className="selector-vista"
                >
                  <option value="ranking">Ranking</option>
                  <option value="jugadores">Lista de Jugadores</option>
                </select>
              </div>
            </div>

            {/* RENDERIZADO CONDICIONAL DE TABLAS PASANDO LA BÚSQUEDA */}
            <div className="placeholder-tabla">
              {vistaTabla === 'ranking' ? (
                <TablaClasificacion busqueda={busqueda} />
              ) : (
                <TablaJugadores busqueda={busqueda} />
              )}
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
      </div>
  )
}

export default App