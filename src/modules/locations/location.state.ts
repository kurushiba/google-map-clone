import { atom } from 'jotai';

export const locationAtom = atom<[number, number] | null>(null);
