import {inject, Injectable} from '@angular/core';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChargingStation} from '../domain/model/charging-station.entity';
import {ChargingStationApiEndpoint} from './charging-station-api-endpoint';
import {VehicleCharge} from '../domain/model/vehicle-charge.entity';
import {VehicleChargeApiEndpoint} from './vehicle-charge-api-endpoint';


@Injectable({providedIn: 'root'})
export class SharedApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly chargingStationEndpoint = new ChargingStationApiEndpoint(this.http);
  private readonly vehicleChargeEndpoint = new VehicleChargeApiEndpoint(this.http);

  getChargingStations = (): Observable<ChargingStation[]> => this.chargingStationEndpoint.getAll();
  getChargingStation = (id: number): Observable<ChargingStation> => this.chargingStationEndpoint.getById(id);
  createChargingStation = (chargingStation: ChargingStation): Observable<ChargingStation> => this.chargingStationEndpoint.create(chargingStation);
  updateChargingStation = (chargingStation: ChargingStation): Observable<ChargingStation> => this.chargingStationEndpoint.updateStringId(chargingStation, chargingStation.id);
  deleteChargingStation = (id: string): Observable<void> => this.chargingStationEndpoint.deleteIdString(id);
  getVehicleCharges = (): Observable<VehicleCharge[]> => this.vehicleChargeEndpoint.getAll();
  getVehicleCharge = (id: number): Observable<VehicleCharge> => this.vehicleChargeEndpoint.getById(id);
  createVehicleCharge = (vehicleCharge: VehicleCharge): Observable<VehicleCharge> => this.vehicleChargeEndpoint.create(vehicleCharge);
  updateVehicleCharge = (vehicleCharge: VehicleCharge): Observable<VehicleCharge> => this.vehicleChargeEndpoint.update(vehicleCharge, vehicleCharge.id);
  deleteVehicleCharge = (id: number): Observable<void> => this.vehicleChargeEndpoint.delete(id);
}
