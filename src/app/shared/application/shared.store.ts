import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {SharedApi} from '../infrastructure/shared-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';
import {ChargingStation} from '../domain/model/charging-station.entity';
import {VehicleCharge} from '../domain/model/vehicle-charge.entity';

/**
 * Holds shared application state and coordinates CRUD operations.
 */
@Injectable({providedIn: 'root'})
export class SharedStore {
  private readonly api = inject(SharedApi);

  readonly chargingStationCount = computed(() => this.chargingStations().length);
  readonly vehicleChargeCount = computed(() => this.vehicleCharges().length);

  private readonly chargingStationSignal = signal<ChargingStation[]>([]);
  readonly chargingStations = this.chargingStationSignal.asReadonly();
  private readonly vehicleChargeSignal = signal<VehicleCharge[]>([]);
  readonly vehicleCharges = this.vehicleChargeSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadChargingStations();
    this.loadVehicleCharges();
  }

  getChargingStationById = (id: string): Signal<ChargingStation | undefined> =>
    computed(() => id ? this.chargingStations().find(c => c.id === id) : undefined);

  addChargingStation = (item: ChargingStation): void => {
    this.loadingSignal.set(true);
    this.api.createChargingStation(item).pipe(retry(2)).subscribe({
      next: created => { this.chargingStationSignal.update(list => [...list, created]); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.fmt(err, 'create charging-station')); this.loadingSignal.set(false); }
    });
  };

  updateChargingStation = (item: ChargingStation): void => {
    this.loadingSignal.set(true);
    this.api.updateChargingStation(item).pipe(retry(2)).subscribe({
      next: updated => { this.chargingStationSignal.update(list => list.map(i => i.id === updated.id ? updated : i)); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.fmt(err, 'update charging-station')); this.loadingSignal.set(false); }
    });
  };

  deleteChargingStation = (id: string): void => {
    this.loadingSignal.set(true);
    this.api.deleteChargingStation(id).pipe(retry(2)).subscribe({
      next: ()  => { this.chargingStationSignal.update(list => list.filter(i => i.id !== id)); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.fmt(err, 'delete charging-station')); this.loadingSignal.set(false); }
    });
  };
  getVehicleChargeById = (id: number): Signal<VehicleCharge | undefined> =>
    computed(() => id ? this.vehicleCharges().find(c => c.id === id) : undefined);

  addVehicleCharge = (item: VehicleCharge): void => {
    this.loadingSignal.set(true);
    this.api.createVehicleCharge(item).pipe(retry(2)).subscribe({
      next: created => { this.vehicleChargeSignal.update(list => [...list, created]); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.fmt(err, 'create vehicle-charge')); this.loadingSignal.set(false); }
    });
  };

  updateVehicleCharge = (item: VehicleCharge): void => {
    this.loadingSignal.set(true);
    this.api.updateVehicleCharge(item).pipe(retry(2)).subscribe({
      next: updated => { this.vehicleChargeSignal.update(list => list.map(i => i.id === updated.id ? updated : i)); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.fmt(err, 'update vehicle-charge')); this.loadingSignal.set(false); }
    });
  };

  deleteVehicleCharge = (id: number): void => {
    this.loadingSignal.set(true);
    this.api.deleteVehicleCharge(id).pipe(retry(2)).subscribe({
      next: ()  => { this.vehicleChargeSignal.update(list => list.filter(i => i.id !== id)); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.fmt(err, 'delete vehicle-charge')); this.loadingSignal.set(false); }
    });
  };

  private loadChargingStations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getChargingStations().pipe(takeUntilDestroyed()).subscribe({
      next: items => { this.chargingStationSignal.set(items); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err  => { this.errorSignal.set(this.fmt(err, 'load charging-stations')); this.loadingSignal.set(false); }
    });
  };
  private loadVehicleCharges = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getVehicleCharges().pipe(takeUntilDestroyed()).subscribe({
      next: items => { this.vehicleChargeSignal.set(items); this.resolveRelations(); this.loadingSignal.set(false); },
      error: err  => { this.errorSignal.set(this.fmt(err, 'load vehicle-charges')); this.loadingSignal.set(false); }
    });
  };

  private resolveRelations(): void {}

  private fmt = (err: unknown, op: string): string =>
    err instanceof Error ? err.message : `Failed to ${op}`;
}
