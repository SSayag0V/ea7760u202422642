export interface ChargingStationsResponse{
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
