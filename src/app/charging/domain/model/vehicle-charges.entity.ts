export class VehicleCharges {
  #id: number;
  #stationId: string;
  #vehicleType: string;
  makeId: number;
  #makeName: string;
  #kwDemand: number;
  #chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: Date;

  constructor(){
    this.#id = 0;
    this.#stationId = '';
    this.#vehicleType = '';
    this.makeId = 0;
    this.#makeName = '';
    this.#kwDemand = 0;
    this.#chargingPortType = '';
    this.isFastCharge = false;
    this.registeredAt = new Date();

  }
}
