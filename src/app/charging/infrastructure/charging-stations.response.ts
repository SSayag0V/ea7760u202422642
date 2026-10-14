import {BaseResponse} from '../../shared/infrastructure/base-response';

export interface ChargingStationsResource{
  id: string;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: {
    lat: number;
    lng: number;
  }
}

export interface ChargingStationsResponse extends BaseResponse{
  chargingStations: ChargingStationsResource[];
}
