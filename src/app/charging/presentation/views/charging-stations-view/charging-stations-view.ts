import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedStore} from '../../../../shared/application/shared.store';

/** Config-driven cards view. Presentation, aggregate metrics and actions come from JSONC. */
@Component({
  selector: 'app-charging-stations-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './charging-stations-view.html',
  styleUrl: './charging-stations-view.css'
})
export class ChargingStationsView {
  private readonly storeShared = inject(SharedStore);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  readonly currentLanguage = signal(this.translate.getCurrentLang() || 'en');
  readonly baseItems = this.storeShared.chargingStations;
  readonly navigationFilter: any = null;
  readonly navigationFilterValue = signal(this.navigationFilter?.query_param ? this.activeRoute.snapshot.queryParamMap.get(this.navigationFilter.query_param) : null);
  readonly items = computed(() => { const rows = this.baseItems(); const filter = this.navigationFilter; const expected = this.navigationFilterValue(); if (!filter?.field || expected === null || expected === undefined || expected === '') return rows; return rows.filter((row: any) => String(this.valueOf(row, filter.field)) === String(expected)); });
  readonly cardDefinition: any = {"header": {"type": "image", "field": "bannerUrl", "alt_field": "name"}, "title": {"field": "name"}, "subtitle": {"type": "metrics", "items": [{"key": "TotalGridLoad", "label_en": "Total Grid Load", "label_es": "Carga Total de la Red", "calculation": {"type": "aggregate", "collection": "vehicle-charges", "operation": "sum", "field": "stationId", "match": {"foreign_key": "stationId", "parent_key": "id"}}}]}, "content": {"type": "related-list", "collection": "vehicle-charges", "match": {"foreign_key": "stationId", "parent_key": "id"}, "display_field": "vehicleType", "empty_en": "No vehicle charges", "empty_es": "Sin cargas de vehículo"}, "actions": [{"name": "editChargingStation", "type": "navigate", "label_en": "Edit Charging Station", "label_es": "Editar Estación de Carga", "path": "/charging-stations/{id}"}, {"name": "viewChargingStation", "type": "open-url", "label_en": "View Charging Station", "label_es": "Ver Estación de Carga", "url_field": "website", "target": "_blank"}]};
  readonly metricDefinitions: any[] = [{"key": "TotalGridLoad", "label_en": "Total Grid Load", "label_es": "Carga Total de la Red", "calculation": {"type": "aggregate", "collection": "vehicle-charges", "operation": "sum", "field": "stationId", "match": {"foreign_key": "stationId", "parent_key": "id"}}}];
  readonly contentDefinition: any = {"type": "related-list", "collection": "vehicle-charges", "match": {"foreign_key": "stationId", "parent_key": "id"}, "display_field": "vehicleType", "empty_en": "No vehicle charges", "empty_es": "Sin cargas de vehículo"};
  readonly actions: any[] = [{"name": "editChargingStation", "type": "navigate", "label_en": "Edit Charging Station", "label_es": "Editar Estación de Carga", "path": "/charging-stations/{id}"}, {"name": "viewChargingStation", "type": "open-url", "label_en": "View Charging Station", "label_es": "Ver Estación de Carga", "url_field": "website", "target": "_blank"}];
  readonly collections: Record<string, () => any[]> = {
    "charging-stations": () => this.storeShared.chargingStations(),
    "vehicle-charges": () => this.storeShared.vehicleCharges(),
  };
  readonly columns = 3;
  constructor() { this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(event => this.currentLanguage.set(event.lang)); this.activeRoute.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => this.navigationFilterValue.set(this.navigationFilter?.query_param ? params.get(this.navigationFilter.query_param) : null)); }
  get languageIsSpanish(): boolean { return this.currentLanguage() === 'es'; }
  pageTitle(): string { return this.languageIsSpanish ? "Estaciones de Carga" : "Carge Stations"; }
  emptyText(): string { return this.languageIsSpanish ? "No se encontraron estaciones de carga." : "No charging stations found."; }
  descriptionText(): string { return this.languageIsSpanish ? "" : ""; }
  labelOf(definition: any): string { return this.languageIsSpanish ? (definition.label_es ?? definition.label_en ?? definition.key ?? '') : (definition.label_en ?? definition.label_es ?? definition.key ?? ''); }
  valueOf(item: any, path: string): any { return String(path || '').split('.').filter(Boolean).reduce((value: any, part: string) => value == null ? undefined : value[part], item); }
  relatedRows(item: any, definition: any): any[] {
    const rows = this.collections[definition.collection]?.() ?? [];
    const match = definition.match ?? {};
    return rows.filter(row => String(this.valueOf(row, match.foreign_key || 'id')) === String(this.valueOf(item, match.parent_key || 'id')));
  }
  aggregate(item: any, calculation: any): number {
    if (!calculation || calculation.type !== 'aggregate') return 0;
    const rows = this.relatedRows(item, {collection: calculation.collection, match: calculation.match});
    const values = rows.map(row => Number(this.valueOf(row, calculation.field) ?? 0));
    switch (calculation.operation) {
      case 'count': return rows.length;
      case 'sum': return values.reduce((total, value) => total + value, 0);
      case 'avg': return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;
      case 'min': return values.length ? Math.min(...values) : 0;
      case 'max': return values.length ? Math.max(...values) : 0;
      default: throw new Error(`Unsupported aggregate operation: ${calculation.operation}`);
    }
  }
  metric(item: any, definition: any): number {
    return definition.calculation?.type === 'aggregate'
      ? this.aggregate(item, definition.calculation)
      : Number(this.valueOf(item, definition.field || definition.key) ?? 0);
  }
  interpolate(template: string, item: any): string { return String(template ?? '').replace(/\{([^{}]+)\}/g, (_m: string, path: string) => String(this.valueOf(item, path === 'id' ? 'id' : path) ?? '')); }
  labelFor(action: any): string { return this.labelOf(action); }
  runAction(action: any, item: any): void {
    if (action.type === 'navigate') { void this.router.navigateByUrl(this.interpolate(action.path, item)); return; }
    if (action.type === 'open-url') { const url = this.valueOf(item, action.url_field); if (url) window.open(String(url), action.target || '_blank', 'noopener,noreferrer'); return; }

  }
}
