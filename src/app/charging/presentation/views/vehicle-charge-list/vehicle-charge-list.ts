import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SharedStore} from '../../../../shared/application/shared.store';
import {VehicleChargeCard} from '../../../../shared/presentation/components/vehicle-charge-card/vehicle-charge-card';

/**
 * Lists all VehicleCharge records and coordinates their CRUD navigation/actions.
 */
@Component({
  selector: 'app-vehicle-charge-list',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, TranslatePipe, VehicleChargeCard],
  templateUrl: './vehicle-charge-list.html',
  styleUrl: './vehicle-charge-list.css'
})
export class VehicleChargeList {
  readonly store = inject(SharedStore);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  readonly navigationFilter: any = {"field": "stationId", "query_param": "stationId", "operator": "equals", "source_field": "id"};
  readonly navigationFilterValue = signal(this.navigationFilter?.query_param ? this.activeRoute.snapshot.queryParamMap.get(this.navigationFilter.query_param) : null);
  readonly visibleItems = computed(() => { const rows = this.store.vehicleCharges(); const filter = this.navigationFilter; const expected = this.navigationFilterValue(); if (!filter?.field || expected === null || expected === '') return rows; return rows.filter((item: any) => String(item[filter.field]) === String(expected)); });
  constructor() { this.activeRoute.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => this.navigationFilterValue.set(this.navigationFilter?.query_param ? params.get(this.navigationFilter.query_param) : null)); }
  readonly showAdd = true;
  readonly showEdit = true;
  readonly showDelete = true;

  navigateToNew(): void {
    void this.router.navigateByUrl('/vehicle-charges/new');
  }

  editItem(id: number): void {
    void this.router.navigateByUrl(`/vehicle-charges/${id}/edit`);
  }

  deleteItem(id: number): void {
    if (!window.confirm(this.translate.instant('common.confirm-delete'))) return;
    this.store.deleteVehicleCharge(id);
  }
}
