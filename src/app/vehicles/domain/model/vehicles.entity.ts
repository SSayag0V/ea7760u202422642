export class Vehicles{
  #MakeId: number;
  #MakeName: string
  #VehicleTypeId: number;
  #VehicleTypeName: string;
  constructor(){
    this.#MakeId = 0;
    this.#MakeName = '';
    this.#VehicleTypeId = 0;
    this.#VehicleTypeName = '';
  }
}
