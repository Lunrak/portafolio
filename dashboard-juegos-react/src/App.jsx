import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import GameSearch from './components/GameSearch';
import Loading from './components/Loading';
import TodoApp from './components/todo/TodoApp';

const todosLosJuegos = [
  { id: 'ahorcado', title: 'Ahorcado' },
  { id: 'memoria', title: 'Jego de Memoria' },
  { id: 'trivia', title: 'Trivia' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vistaActual, setVistaActual] = useState('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => {
      setGames(todosLosJuegos);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );
  }, [games, searchTerm]);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="app-container">
      <nav className="app-nav">
        <button
          onClick={() => setVistaActual('dashboard')}
          className={vistaActual === 'dashboard' ? 'active' : ''}
        >
          Juegos
        </button>
        <button
          onClick={() => setVistaActual('todo')}
          className={vistaActual === 'todo' ? 'active' : ''}
        >
          Tareas
        </button>
      </nav>

      <Header
        title={
          vistaActual === 'dashboard' ? 'Dashboard de Juegos' : 'Mis Tareas'
        }
      />

      {vistaActual === 'dashboard' ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            <GameSearch value={searchTerm} onChange={handleSearch} />
            {filteredGames.length > 0 ? (
              <GameList games={filteredGames} />
            ) : (
              <p className="no-results">No se encontraron resultados</p>
            )}
          </>
        )
      ) : (
        <TodoApp />
      )}
    </div>
  );
}

export default App;
