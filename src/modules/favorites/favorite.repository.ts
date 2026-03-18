import api from '../../lib/api';
import { Spot } from '../spots/spot.entity';

export const favoriteRepository = {
  async getFavorites(): Promise<Spot[]> {
    const result = await api.get('/favorites');
    return result.data.map((spot: Spot) => new Spot(spot));
  },
  async addFavorite(spotId: string): Promise<void> {
    await api.post(`/favorites/${spotId}`);
  },
  async removeFavorite(spotId: string): Promise<void> {
    await api.delete(`/favorites/${spotId}`);
  },
};
