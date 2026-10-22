import { useState } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import GameSearch from './components/GameSearch';

const games = [
  { id: 'ahorcado', title: 'Ahorcado' },
  { id: 'memoria', title: 'Jego de Memoria' },
  { id: 'trivia', title: 'Trivia' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGames = games.filter((game) =>
    game.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
  );

  return (
    <div className="app-container">
      <Header title="Dashboard de Juegos" />
      <GameSearch value={searchTerm} onChange={setSearchTerm} />
      {filteredGames.length > 0 ? (
        <GameList games={filteredGames} />
      ) : (
        <p className="no-results">No se encontraron resultados</p>
      )}
    </div>
  );
}

export default App;
