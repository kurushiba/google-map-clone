import './index.css';
import SpotCard from '../SpotCard';
import { useAtomValue } from 'jotai';
import { spotsAtom } from '../../modules/spots/spots.state';

export default function SpotList() {
  const spots = useAtomValue(spotsAtom);

  return (
    <div className="spot-list">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}
