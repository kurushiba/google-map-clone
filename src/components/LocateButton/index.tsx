import { useEffect, useState } from 'react';
import './index.css';
import { useSetAtom } from 'jotai';
import { locationAtom } from '../../modules/locations/location.state';
import { mapStateAtom } from '../../modules/maps/map.state';
import { routeAtom } from '../../modules/routes/route.state';

export default function LocateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const setLocation = useSetAtom(locationAtom);
  const setMapState = useSetAtom(mapStateAtom);
  const setRoute = useSetAtom(routeAtom);

  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) return;
    navigator.permissions.query({ name: 'geolocation' }).then((status) => {
      if (status.state !== 'granted') return;
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(handleSuccess);
    });
  }, []);

  const handleSuccess = (pos: GeolocationPosition) => {
    const position: [number, number] = [
      pos.coords.latitude,
      pos.coords.longitude,
    ];
    setLocation(position);
    setMapState((prev) => ({ ...prev, center: position, zoom: 7 }));
    setRoute((prev) => ({ ...prev, origin: position }));
    setIsLoading(false);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      window.alert('位置情報がサポートされていません');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, () => {
      window.alert('位置情報の取得に失敗しました');
      setIsLoading(false);
    });
  };

  return (
    <div className="locate-button-wrapper">
      <button
        className={`locate-button ${isLoading ? 'locate-button--loading' : ''}`}
        title="現在地を表示"
        onClick={handleLocate}
        disabled={isLoading}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <line x1="12" y1="2" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="22" />
          <line x1="2" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      </button>
    </div>
  );
}
