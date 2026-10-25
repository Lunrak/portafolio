import { createContext, useContext } from 'react';

export const FavoritesContext = createContext(null);
FavoritesContext.displayName = 'FavoritesContext';

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
}
