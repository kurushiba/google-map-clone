import { atom } from 'jotai';

interface MapState {
  center: [number, number];
  zoom: number;
  selectedSpotId: string | null;
}

export const mapStateAtom = atom<MapState>({
  center: [35.6812, 139.7671],
  zoom: 15,
  selectedSpotId: null,
});
