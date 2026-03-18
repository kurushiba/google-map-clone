import { useAtom } from 'jotai';
import { Spot } from '../spots/spot.entity';
import { favoritesAtom } from './favorite.state';
import { useState, type MouseEvent } from 'react';
import { favoriteRepository } from './favorite.repository';

export function useFavoriteToggle(spot: Spot) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorite = favorites.some((favorite) => favorite.id === spot.id);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsLoading(true);

    try {
      if (isFavorite) {
        await favoriteRepository.removeFavorite(spot.id);
        setFavorites((prev) =>
          prev.filter((favorite) => favorite.id !== spot.id),
        );
      } else {
        await favoriteRepository.addFavorite(spot.id);
        setFavorites((prev) => [...prev, { ...spot, isFavorite: true }]);
      }
    } catch (error) {
      console.error(error);
      window.alert('お気に入りの更新に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isFavorite, toggleFavorite };
}
