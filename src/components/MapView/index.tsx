import './index.css';
import LocateButton from '../LocateButton';
import RoutePanel from '../RoutePanel';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useAtomValue } from 'jotai';
import { mapStateAtom } from '../../modules/maps/map.state';
import { useEffect } from 'react';
import { spotsAtom } from '../../modules/spots/spots.state';
import SpotMarker from '../SpotMarker';
import CurrentLocationMarker from '../CurrentLocationMarker';
import RouteLayer from '../RouteLayer';

function MapController() {
  const map = useMap();
  const { center, zoom } = useAtomValue(mapStateAtom);

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  return null;
}

export default function MapView() {
  const spots = useAtomValue(spotsAtom);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[35.6812, 139.7671]}
        zoom={15}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController />
        {spots.map((spot) => (
          <SpotMarker key={spot.id} spot={spot} />
        ))}
        <CurrentLocationMarker />
        <RouteLayer />
      </MapContainer>
      <LocateButton />
      <RoutePanel />
    </div>
  );
}
