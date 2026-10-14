import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SharedStore} from '../../../../shared/application/shared.store';
import {ChargingStationCard} from '../../../../shared/presentation/components/charging-station-card/charging-station-card';

/**
 * Lists all ChargingStation records and coordinates their CRUD navigation/actions.
 */
@Component({
  selector: 'app-charging-station-list',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, TranslatePipe, ChargingStationCard],
  templateUrl: './charging-station-list.html',
  styleUrl: './charging-station-list.css'
})
export class ChargingStationList {
  readonly store = inject(SharedStore);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  readonly navigationFilter: any = null;
  readonly navigationFilterValue = signal(this.navigationFilter?.query_param ? this.activeRoute.snapshot.queryParamMap.get(this.navigationFilter.query_param) : null);
  readonly visibleItems = computed(() => { const rows = this.store.chargingStations(); const filter = this.navigationFilter; const expected = this.navigationFilterValue(); if (!filter?.field || expected === null || expected === '') return rows; return rows.filter((item: any) => String(item[filter.field]) === String(expected)); });
  constructor() { this.activeRoute.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => this.navigationFilterValue.set(this.navigationFilter?.query_param ? params.get(this.navigationFilter.query_param) : null)); }
  readonly showAdd = false;
  readonly showEdit = false;
  readonly showDelete = false;

  navigateToNew(): void {
    void this.router.navigateByUrl('/charging-stations/new');
  }

  editItem(id: string): void {
    void this.router.navigateByUrl(`/charging-stations/${id}/edit`);
  }

  deleteItem(id: string): void {
    if (!window.confirm(this.translate.instant('common.confirm-delete'))) return;
    this.store.deleteChargingStation(id);
  }
}
