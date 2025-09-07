import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Coffee } from '@/types/coffee';

type FavoritesContextType = {
  favorites: Coffee[];
  addToFavorites: (coffee: Coffee) => void;
  removeFromFavorites: (coffeeId: string) => void;
  isFavorite: (coffeeId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Coffee[]>([]);

  const addToFavorites = useCallback((coffee: Coffee) => {
    setFavorites(prevFavorites => {
      // Check if already in favorites
      if (!prevFavorites.some(item => item.id === coffee.id)) {
        return [...prevFavorites, { ...coffee, isFavorite: true }];
      }
      return prevFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((coffeeId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== coffeeId));
  }, []);

  const isFavorite = useCallback((coffeeId: string) => {
    return favorites.some(item => item.id === coffeeId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
