import axios from 'axios';
import type { LatLng, RouteData } from './route.state';

export const routeRepository = {
  async getRoute(origin: LatLng, destination: LatLng): Promise<RouteData> {
    const result = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`,
    );
    const data = result.data;
    if (!data.routes || data.routes.length === 0)
      throw new Error('No route found');
    const route = data.routes[0];
    return {
      coordinates: route.geometry.coordinates,
      distance: route.distance,
      duration: route.duration,
    };
  },
};
