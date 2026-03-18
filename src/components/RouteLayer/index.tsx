import { useAtom } from 'jotai';
import './index.css';
import { routeAtom } from '../../modules/routes/route.state';
import { useEffect, useState } from 'react';
import { routeRepository } from '../../modules/routes/route.repository';
import { Polyline } from 'react-leaflet';
// マップコンポーネントのため、react-leaflet / leaflet なしでは表示されません

export default function RouteLayer() {
  const [route, setRoute] = useAtom(routeAtom);
  const { origin, destination, routeData } = route;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoute();
  }, [origin, destination]);

  const fetchRoute = async () => {
    if (isLoading) return;
    if (!origin || !destination) {
      setRoute((prev) => ({ ...prev, routeData: null }));
      return;
    }

    setIsLoading(true);
    try {
      const data = await routeRepository.getRoute(origin, destination);
      setRoute((prev) => ({ ...prev, routeData: data }));
    } catch (error) {
      console.error(error);
      window.alert('ルートの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {routeData && (
        <Polyline
          positions={routeData.coordinates.map(([lng, lat]) => [lat, lng])}
          pathOptions={{ color: '#1a73e8', weight: 5, opacity: 0.8 }}
        />
      )}
    </>
  );
}
