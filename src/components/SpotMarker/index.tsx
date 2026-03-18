import { Marker, Popup } from 'react-leaflet';
import type { Spot } from '../../modules/spots/spot.entity';
import './index.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { favoritesAtom } from '../../modules/favorites/favorite.state';
import L from 'leaflet';
import SpotPopup from '../SpotPopup';
import { useEffect, useRef } from 'react';
import { mapStateAtom } from '../../modules/maps/map.state';

const CATEGORY_COLORS: { [key: string]: string } = {
  cafe: '#c5221f',
  restaurant: '#b06000',
  park: '#137333',
  shopping: '#1a73e8',
  tourism: '#7b1fa2',
  convenience: '#e65100',
  hospital: '#c5221f',
  station: '#3949ab',
};

interface Props {
  spot: Spot;
}

export default function SpotMarker({ spot }: Props) {
  const favoriteSpots = useAtomValue(favoritesAtom);
  const isFavorite = favoriteSpots.some((favorite) => favorite.id === spot.id);
  const color = CATEGORY_COLORS[spot.category];
  const markerRef = useRef<L.Marker>(null);
  const { selectedSpotId } = useAtomValue(mapStateAtom);
  const setMapState = useSetAtom(mapStateAtom);

  useEffect(() => {
    if (selectedSpotId === spot.id && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [selectedSpotId]);

  const icon = isFavorite
    ? L.divIcon({
        className: 'spot-marker',
        html: `<div class="spot-marker-icon spot-marker-icon--favorite"><svg viewBox="0 0 24 24" fill="#ea4335" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      })
    : L.divIcon({
        className: 'spot-marker',
        html: `<div class="spot-marker-icon" style="background-color:${color};"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14],
      });

  return (
    <Marker
      position={[spot.latitude, spot.longitude]}
      icon={icon}
      ref={markerRef}
      eventHandlers={{
        popupclose: () => {
          setMapState((prev) => ({ ...prev, selectedSpotId: null }));
        },
      }}
    >
      <Popup>
        <SpotPopup spot={spot} />
      </Popup>
    </Marker>
  );
}
