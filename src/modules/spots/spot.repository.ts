import api from '../../lib/api';
import { Spot } from './spot.entity';

export const spotRepository = {
  async getSpots(
    params: {
      category?: string;
      search?: string;
    } = {},
  ): Promise<Spot[]> {
    const result = await api.get('/spots', { params });
    return result.data.map((spot: Spot) => new Spot(spot));
  },
};
