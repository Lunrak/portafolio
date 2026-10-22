import Header from './components/Header';
import GameList from './components/GameList';

const games = [
  { id: 'ahorcado', title: 'Ahorcado' },
  { id: 'memoria', title: 'Jego de Memoria' },
  { id: 'trivia', title: 'Trivia' },
];

function App() {
  return (
    <div>
      <Header title="Dashboard de Juegos" />
      <GameList games={games} />
    </div>
  );
}

export default App;
