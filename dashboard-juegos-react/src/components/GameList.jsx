function GameList({ games }) {
  return (
    <ul className="game-list">
      {games.map((game) => (
        <li key={game.id} className="game-card">
          {game.title}
        </li>
      ))}
    </ul>
  );
}

export default GameList;
