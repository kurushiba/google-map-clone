import { useAtom } from 'jotai';
import './index.css';
import { routeAtom } from '../../modules/routes/route.state';

export default function RoutePanel() {
  const [route, setRoute] = useAtom(routeAtom);
  const { routeData } = route;

  if (!routeData) return null;

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} 分`;

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} 時間 ${mins} 分` : `${hours} 時間`;
  };

  const handleClear = () => {
    setRoute((prev) => ({
      ...prev,
      destination: null,
      routeData: null,
    }));
  };

  return (
    <div className="route-panel">
      <div className="route-panel-info">
        <span className="route-panel-distance">
          {formatDistance(routeData.distance)}
        </span>
        <span className="route-panel-separator">·</span>
        <span className="route-panel-duration">
          約 {formatDuration(routeData.duration)}
        </span>
      </div>
      <button className="route-panel-clear" onClick={handleClear}>
        クリア
      </button>
    </div>
  );
}
