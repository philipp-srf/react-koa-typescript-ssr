import { fetchStations, RadioPlayer } from './containers/RadioPlayer';
import { fetchMedia, VideoPlayer } from './containers/VideoPlayer';

type AppRoute = {
  path: string;
  component: () => any;
  loadData: () => any;
};

export const routes: AppRoute[] = [
  {
    path: '/radio/',
    component: RadioPlayer,
    loadData: async () => await fetchStations()
  },
  {
    path: '/tv/',
    component: VideoPlayer,
    loadData: async () => await fetchMedia()
  }
];
