export interface VehicleChargesResponse{
  id: number;
  stationId: string;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: Date;
}
