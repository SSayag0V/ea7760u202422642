import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';


const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found')
    .then(m => m.PageNotFound);

const chargingRoutes = () => import('./charging/presentation/charging.routes').then(m => m.chargingRoutes);
const vehiclesRoutes = () => import('./vehicles/presentation/vehicles.routes').then(m => m.vehiclesRoutes);

const baseTitle = 'ea7760u202422642';

/**
 * Root route configuration composing shared views and bounded-context routes.
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: 'ea7760u202422642 - Home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', loadChildren: chargingRoutes },
  { path: '', loadChildren: vehiclesRoutes },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Not Found` }
];
