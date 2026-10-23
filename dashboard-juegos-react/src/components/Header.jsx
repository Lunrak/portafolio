import { useFavorites } from '../context/FavoritesContext';

function Header({ title }) {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="fav-counter">★ {favorites.length} favoritos</p>
    </header>
  );
}

export default Header;
