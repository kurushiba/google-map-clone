import { atom } from 'jotai';

interface FilterState {
  category: string;
  searchQuery: string;
}

export const filterStateAtom = atom<FilterState>({
  category: '',
  searchQuery: '',
});
