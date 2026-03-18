import { atom } from 'jotai';

export type LatLng = [number, number];

export interface RouteData {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

interface RouteState {
  origin: LatLng | null;
  destination: LatLng | null;
  routeData: RouteData | null;
}

export const routeAtom = atom<RouteState>({
  origin: null,
  destination: null,
  routeData: null,
});
