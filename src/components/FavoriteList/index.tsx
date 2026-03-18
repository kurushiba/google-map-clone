import './index.css';
import SpotCard from '../SpotCard';
import { useAtomValue } from 'jotai';
import { favoritesAtom } from '../../modules/favorites/favorite.state';

export default function FavoriteList() {
  const favorites = useAtomValue(favoritesAtom);

  if (favorites.length === 0)
    return <div className="favorite-list-empty">お気に入りがありません</div>;

  return (
    <div className="favorite-list">
      {favorites.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}
