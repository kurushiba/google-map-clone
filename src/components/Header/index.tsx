import { useEffect, useRef, useState } from 'react';
import './index.css';
import { searchPlace, type NominatimResult } from '../../lib/nominatim';
import { useAtom, useSetAtom } from 'jotai';
import { mapStateAtom } from '../../modules/maps/map.state';
import { currentUserAtom } from '../../modules/auth/current-user.state';

export default function Header() {
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setMapState = useSetAtom(mapStateAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    document.addEventListener('mousedown', closeResult);
    return () => document.removeEventListener('mousedown', closeResult);
  }, []);

  const closeResult = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const searchAddress = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchPlace(value);
      setResults(data);
      setIsOpen(data.length > 0);
      console.log(data);
    } catch (error) {
      console.error(error);
      window.alert('住所検索に失敗しました');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => searchAddress(value), 500);
  };

  const hadleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const jumpToAddress = (result: NominatimResult) => {
    setMapState((prev) => ({
      ...prev,
      center: [parseFloat(result.lat), parseFloat(result.lon)],
      zoom: 15,
    }));
    setQuery(result.displayName);
    setResults([]);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(undefined);
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-logo-icon">M</div>
        <span className="header-logo-text">MapExplorer</span>
      </div>
      <div className="header-search">
        <div className="address-search" ref={wrapperRef}>
          <div className="address-search-input-wrapper">
            <svg
              className="address-search-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="address-search-input"
              placeholder="住所・地名を検索"
              onChange={handleInputChange}
              value={query}
            />
            {isLoading && <span className="address-search-spinner" />}
            {query && !isLoading && (
              <button className="address-search-clear" onClick={hadleClear}>
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
          {isOpen && results.length > 0 && (
            <ul className="address-search-dropdown">
              {results.map((result) => (
                <li
                  className="address-search-item"
                  key={result.placeId}
                  onClick={() => jumpToAddress(result)}
                >
                  <svg
                    className="address-search-item-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="address-search-item-text">
                    {result.displayName}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <span className="header-username">{currentUser!.name}</span>
      <button className="header-logout" onClick={handleLogout}>
        ログアウト
      </button>
    </header>
  );
}
