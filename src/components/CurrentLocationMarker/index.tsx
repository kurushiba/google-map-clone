import { useAtomValue } from 'jotai';
import './index.css';
import { locationAtom } from '../../modules/locations/location.state';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
// マップコンポーネントのため、react-leaflet / leaflet なしでは表示されません
// const icon = '<div class="current-location-dot"></div><div class="current-location-pulse"></div>';

export default function CurrentLocationMarker() {
  const position = useAtomValue(locationAtom);
  if (!position) return null;

  const icon = L.divIcon({
    className: 'current-location-marker',
    html: '<div class="current-location-dot"></div><div class="current-location-pulse"></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return <Marker position={position} icon={icon} interactive={false} />;
}
