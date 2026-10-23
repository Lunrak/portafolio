import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import GameSearch from './components/GameSearch';
import Loading from './components/Loading';

const todosLosJuegos = [
  { id: 'ahorcado', title: 'Ahorcado' },
  { id: 'memoria', title: 'Jego de Memoria' },
  { id: 'trivia', title: 'Trivia' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <Header title="Dashboard de Juegos" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <GameSearch value={searchTerm} onChange={handleSearch} />

          {searchTerm && (
            <button className="clear-btn" onClick={() => handleSearch('')}>
              Limpiar Búsqueda
            </button>
          )}

          {filteredGames.length > 0 ? (
            <GameList games={filteredGames} />
          ) : (
            <p className="no-results">No se encontraron resultados</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
