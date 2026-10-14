import {BaseAssemblerString} from './base-assembler-special';
import {ChargingStation} from '../domain/model/charging-station.entity';

import {ChargingStationResource, ChargingStationsResponse} from './responses';

/**
 * Maps charging-station entities to and from API resources.
 */
export class ChargingStationAssembler implements BaseAssemblerString<ChargingStation, ChargingStationResource, ChargingStationsResponse> {

  toEntitiesFromResponse = (response: ChargingStationsResponse): ChargingStation[] =>
    response.chargingStations.map(r => this.toEntityFromResource(r));

  toEntityFromResource = (resource: ChargingStationResource): ChargingStation =>
    new ChargingStation({
      id: resource.id ?? '',
      stationName: resource.stationName ?? '',
      vehicleType: resource.vehicleType ?? '',
      maxGridKwCapacity: resource.maxGridKwCapacity ?? 0,
      stallsAvailable: resource.stallsAvailable ?? 0,
      isActive: resource.isActive ?? false,
      locationCoordinates: resource.locationCoordinates as any,
    });

  toResourceFromEntity = (entity: ChargingStation): ChargingStationResource =>
    ({
      id: entity.id,
      stationName: entity.stationName,
      vehicleType: entity.vehicleType,
      maxGridKwCapacity: entity.maxGridKwCapacity,
      stallsAvailable: entity.stallsAvailable,
      isActive: entity.isActive,
      locationCoordinates: entity.locationCoordinates,
    } as ChargingStationResource);
}
