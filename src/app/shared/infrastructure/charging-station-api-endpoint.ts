import {BaseApiEndpointStringId} from './base-api-endpoint-special';
import {ChargingStation} from '../domain/model/charging-station.entity';
import {ChargingStationResource, ChargingStationsResponse} from './responses';
import {ChargingStationAssembler} from './charging-station-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


export class ChargingStationApiEndpoint extends BaseApiEndpointStringId<
  ChargingStation, ChargingStationResource, ChargingStationsResponse, ChargingStationAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.ea7760u202422642ApiBaseUrl}${environment.chargingStationsEndpointPath}`,
      new ChargingStationAssembler()
    );
  }
}
