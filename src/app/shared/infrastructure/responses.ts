import {BaseResourceStringId, BaseResponseStringId} from './base-response-special';
import {BaseResource, BaseResponse} from './base-response';

export interface ChargingStationResource {
  id: string;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: unknown;
}


export interface ChargingStationsResponse extends BaseResponseStringId {
  chargingStations: ChargingStationResource[];
}


export interface VehicleChargeResource extends BaseResource {
  id: number;
  stationId: string;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;
}


export interface VehicleChargesResponse extends BaseResponse {
  vehicleCharges: VehicleChargeResource[];
}

