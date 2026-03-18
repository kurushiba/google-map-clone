import { useSetAtom } from 'jotai';
import { useFavoriteToggle } from '../../modules/favorites/useFavoriteToggle';
import { CATEGORY_LABELS, type Spot } from '../../modules/spots/spot.entity';
import './index.css';
import { mapStateAtom } from '../../modules/maps/map.state';

interface Props {
  spot: Spot;
}

export default function SpotCard({ spot }: Props) {
  const { isFavorite, toggleFavorite, isLoading } = useFavoriteToggle(spot);
  const setMapState = useSetAtom(mapStateAtom);

  const handleClick = () => {
    setMapState((prev) => ({
      ...prev,
      center: [spot.latitude, spot.longitude],
      zoom: 17,
      selectedSpotId: spot.id,
    }));
  };

  return (
    <div className="spot-card" onClick={handleClick}>
      <div className="spot-card-body">
        <div className="spot-card-header">
          <span className="spot-card-name">{spot.name}</span>
          <span
            className={`spot-card-category spot-card-category--${spot.category}`}
          >
            {CATEGORY_LABELS[spot.category] ?? spot.category}
          </span>
          <button
            className={`spot-card-favorite ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
            disabled={isLoading}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {spot.address && <p className="spot-card-address">{spot.address}</p>}
      </div>
    </div>
  );
}
