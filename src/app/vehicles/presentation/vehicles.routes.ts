import {Routes} from '@angular/router';

const searchGamesExternalList = () => import('./views/search-games-external-list/search-games-external-list').then(m => m.SearchGamesExternalList);

/**
 * Independent semantic routes for the vehicles bounded context.
 */
export const vehiclesRoutes: Routes = [
  { path: 'games-service/search-games', loadComponent: searchGamesExternalList },
];
