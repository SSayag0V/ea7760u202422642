import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {VehicleCharge} from '../domain/model/vehicle-charge.entity';
import {VehicleChargeResource, VehicleChargesResponse} from './responses';
import {VehicleChargeAssembler} from './vehicle-charge-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for vehicle-charge CRUD operations.
 */
export class VehicleChargeApiEndpoint extends BaseApiEndpoint<
  VehicleCharge, VehicleChargeResource, VehicleChargesResponse, VehicleChargeAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.ea7760u202422642ApiBaseUrl}${environment.vehicleChargesEndpointPath}`,
      new VehicleChargeAssembler()
    );
  }
}
