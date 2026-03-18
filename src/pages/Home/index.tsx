import './index.css';
import MapView from '../../components/MapView';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const currentUser = useAtomValue(currentUserAtom);

  if (!currentUser) return <Navigate to="/signin" />;

  return (
    <div className="home-page">
      <Header />
      <div className="home-body">
        <aside className="home-sidebar">
          <Sidebar />
        </aside>
        <main className="home-map">
          <MapView />
        </main>
      </div>
    </div>
  );
}
