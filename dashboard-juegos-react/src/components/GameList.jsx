function GameList({ games }) {
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>{game.title}</li>
      ))}
    </ul>
  );
}

export default GameList;
