import { useEffect, useMemo, useState, useCallback } from 'react';
import { FavoritesContext } from './FavoritesContext'; // Ajusta la ruta

const STORAGE_KEY = 'favorites';

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* silencioso */
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo(
    () => ({ favorites, toggleFavorite }),
    [favorites, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
