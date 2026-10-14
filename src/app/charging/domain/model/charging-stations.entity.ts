import {Coordinates} from './coordinates';

export class ChargingStations {
  //needs to find a way to rescue STN-001 and convert into a number for the id
  #id: string;
  #stationName: string;
  #vehicleType: string;
  #maxGridKwCapacity: number;
  #stallsAvailable: number;
  #isActive: boolean;
  locationCoordinates: Coordinates;


  constructor() {
    this.#id = '';
    this.#stationName = '';
    this.#vehicleType = '';
    this.#maxGridKwCapacity = 0;
    this.#stallsAvailable = 0;
    this.#isActive = false;
    this.locationCoordinates = new Coordinates();
  }
}
