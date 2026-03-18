import { useRef, useState } from 'react';
import './index.css';
import { useSetAtom } from 'jotai';
import { filterStateAtom } from '../../modules/spots/filter.state';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const setFilterState = useSetAtom(filterStateAtom);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setFilterState((prev) => ({ ...prev, searchQuery: value }));
    }, 500);
  };

  const handleClear = () => {
    setQuery('');
    setFilterState((prev) => ({ ...prev, searchQuery: '' }));
  };

  return (
    <div className="search-box">
      <div className="search-box-wrapper">
        <svg className="search-box-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          className="search-box-input"
          placeholder="スポット名を検索"
          onChange={handleInputChange}
          value={query}
        />
        {query && (
          <button className="search-box-clear" onClick={handleClear}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
