import {Routes} from '@angular/router';

const chargingStationsViewRoute = () => import('./views/charging-stations-view/charging-stations-view').then(m => m.ChargingStationsView);
const vehicleChargeList = () => import('./views/vehicle-charge-list/vehicle-charge-list').then(m => m.VehicleChargeList);
const vehicleChargingForm = () => import('./views/vehicle-charge-form/vehicle-charge-form').then(m => m.VehicleChargeForm);
const vehicleChargeForm = () => import('./views/vehicle-charge-form/vehicle-charge-form').then(m => m.VehicleChargeForm);

/**
 * Independent semantic routes for the charging bounded context.
 */
export const chargingRoutes: Routes = [
  { path: 'charging-stations', loadComponent: chargingStationsViewRoute },
  { path: 'vehicle-charges', loadComponent: vehicleChargeList },
  { path: 'vehicle-charges/new', loadComponent: vehicleChargingForm },
  { path: 'vehicle-charges/:id/edit', loadComponent: vehicleChargingForm },
  { path: 'vehicle-charges/new', loadComponent: vehicleChargeForm },
  { path: 'vehicle-charges/:id/edit', loadComponent: vehicleChargeForm },
];
