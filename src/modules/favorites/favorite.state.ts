import { atom } from 'jotai';
import type { Spot } from '../spots/spot.entity';

export const favoritesAtom = atom<Spot[]>([]);
