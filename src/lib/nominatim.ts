import api from './api';

export interface NominatimResult {
  placeId: number;
  displayName: string;
  lat: string;
  lon: string;
}

export const searchPlace = async (value: string) => {
  const res = await api.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&accept-language=ja`,
  );
  return res.data.map((item: any) => ({
    ...item,
    placeId: item.place_id,
    displayName: item.display_name,
  }));
};
