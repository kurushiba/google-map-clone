import './index.css';
import SearchBox from '../SearchBox';
import CategoryFilter from '../CategoryFilter';
import SpotList from '../SpotList';
import { spotRepository } from '../../modules/spots/spot.repository';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { spotsAtom } from '../../modules/spots/spots.state';
import { filterStateAtom } from '../../modules/spots/filter.state';
import { favoriteRepository } from '../../modules/favorites/favorite.repository';
import { favoritesAtom } from '../../modules/favorites/favorite.state';
import FavoriteList from '../FavoriteList';

type Tab = 'spots' | 'favorites';

export default function Sidebar() {
  const setSpots = useSetAtom(spotsAtom);
  const filterState = useAtomValue(filterStateAtom);
  const setFavorites = useSetAtom(favoritesAtom);
  const [activeTab, setActiveTab] = useState<Tab>('spots');

  useEffect(() => {
    fetchSpots();
  }, [filterState]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchSpots = async () => {
    const spots = await spotRepository.getSpots({
      category: filterState.category,
      search: filterState.searchQuery,
    });
    setSpots(spots);
  };

  const fetchFavorites = async () => {
    const spots = await favoriteRepository.getFavorites();
    setFavorites(spots);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        {/* スポット一覧タブ（アクティブ状態）
            お気に入りタブに切り替えたい場合は、下のコメントのように active クラスを移動する */}
        <button
          className={`sidebar-tab ${activeTab === 'spots' ? 'active' : ''}`}
          onClick={() => setActiveTab('spots')}
        >
          スポット一覧
        </button>
        <button
          className={`sidebar-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          お気に入り
        </button>
      </div>

      {activeTab === 'spots' && (
        <>
          <div className="sidebar-search">
            <SearchBox />
          </div>
          <div className="sidebar-filter">
            <CategoryFilter />
          </div>
          <div className="sidebar-content">
            <SpotList />
          </div>
        </>
      )}

      {activeTab === 'favorites' && (
        <div className="sidebar-content">
          <FavoriteList />
        </div>
      )}
    </div>
  );
}
