import { atom } from 'jotai';
import type { Spot } from './spot.entity';

export const spotsAtom = atom<Spot[]>([]);
