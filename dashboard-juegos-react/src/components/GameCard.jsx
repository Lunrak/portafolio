import { useFavorites } from '../context/FavoritesContext';

function GameCard({ game }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(game.id);

  return (
    <li className="game-card">
      <span>{game.title}</span>
      <button
        onClick={() => toggleFavorite(game.id)}
        className={`fav-btn ${isFavorite ? 'is-fav' : ''}`}
        aria-label={
          isFavorite
            ? `Quitar ${game.title} de favoritos`
            : `Añadir ${game.title} a favoritos`
        }
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </li>
  );
}

export default GameCard;
