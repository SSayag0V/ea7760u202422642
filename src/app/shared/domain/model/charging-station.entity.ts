
import {BaseEntityStringId} from '../../infrastructure/base-entity-special';

/**
 * Represents a ChargingStation in the shared bounded context.
 */
export class ChargingStation implements BaseEntityStringId {
  #id: string;
  #stationName: string;
  #vehicleType: string;
  #maxGridKwCapacity: number;
  #stallsAvailable: number;
  #isActive: boolean;
  #locationCoordinates: unknown;


  constructor(props: { id: string; stationName: string; vehicleType: string; maxGridKwCapacity: number; stallsAvailable: number; isActive: boolean; locationCoordinates: unknown }) {
    this.#id = props.id;
    this.#stationName = props.stationName;
    this.#vehicleType = props.vehicleType;
    this.#maxGridKwCapacity = props.maxGridKwCapacity;
    this.#stallsAvailable = props.stallsAvailable;
    this.#isActive = props.isActive;
    this.#locationCoordinates = props.locationCoordinates;

  }

  get id(): string { return this.#id; }
  set id(value: string) { this.#id = value; }
  get stationName(): string { return this.#stationName; }
  set stationName(value: string) { this.#stationName = value; }
  get vehicleType(): string { return this.#vehicleType; }
  set vehicleType(value: string) { this.#vehicleType = value; }
  get maxGridKwCapacity(): number { return this.#maxGridKwCapacity; }
  set maxGridKwCapacity(value: number) { this.#maxGridKwCapacity = value; }
  get stallsAvailable(): number { return this.#stallsAvailable; }
  set stallsAvailable(value: number) { this.#stallsAvailable = value; }
  get isActive(): boolean { return this.#isActive; }
  set isActive(value: boolean) { this.#isActive = value; }
  get locationCoordinates(): unknown { return this.#locationCoordinates; }
  set locationCoordinates(value: unknown) { this.#locationCoordinates = value; }
}
