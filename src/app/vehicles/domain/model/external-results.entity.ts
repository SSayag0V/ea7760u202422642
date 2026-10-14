import {Vehicles} from './vehicles.entity';

export class ExternalResults {
  #Count: number;
  #Message: string;
  #SearchCriteria: string
  #Results: Vehicles[]

  constructor(){
    this.#Count = 0;
    this.#Message = '';
    this.#SearchCriteria = '';
    this.#Results = new Array<Vehicles>();
  }
}
