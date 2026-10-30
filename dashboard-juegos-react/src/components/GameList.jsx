import { memo } from 'react';
import GameCard from './GameCard';

const GameList = memo(function GameList({ games }) {
  return (
    <ul className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );
});

export default GameList;
