import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {VehicleCharge} from '../domain/model/vehicle-charge.entity';

import {VehicleChargeResource, VehicleChargesResponse} from './responses';

/**
 * Maps vehicle-charge entities to and from API resources.
 */
export class VehicleChargeAssembler implements BaseAssembler<VehicleCharge, VehicleChargeResource, VehicleChargesResponse> {

  toEntitiesFromResponse = (response: VehicleChargesResponse): VehicleCharge[] =>
    response.vehicleCharges.map(r => this.toEntityFromResource(r));

  toEntityFromResource = (resource: VehicleChargeResource): VehicleCharge =>
    new VehicleCharge({
      id: resource.id ?? 0,
      stationId: resource.stationId ?? '',
      vehicleType: resource.vehicleType ?? '',
      makeId: resource.makeId ?? 0,
      makeName: resource.makeName ?? '',
      kwDemand: resource.kwDemand ?? 0,
      chargingPortType: resource.chargingPortType ?? '',
      isFastCharge: resource.isFastCharge ?? false,
      registeredAt: resource.registeredAt ?? '',
    });

  toResourceFromEntity = (entity: VehicleCharge): VehicleChargeResource =>
    ({
      id: entity.id,
      stationId: entity.stationId,
      vehicleType: entity.vehicleType,
      makeId: entity.makeId,
      makeName: entity.makeName,
      kwDemand: entity.kwDemand,
      chargingPortType: entity.chargingPortType,
      isFastCharge: entity.isFastCharge,
      registeredAt: entity.registeredAt,
    } as VehicleChargeResource);
}
