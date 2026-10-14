import {Component, computed, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {GamesServiceService} from '../../../infrastructure/games-service.service';

/**
 * Displays records returned by the configured gamesService.searchGames external endpoint.
 */
@Component({
  selector: 'app-search-games-external-list',
  imports: [MatCardModule, MatProgressSpinnerModule, TranslatePipe],
  templateUrl: './search-games-external-list.html',
  styleUrl: './search-games-external-list.css'
})
export class SearchGamesExternalList {
  private readonly api = inject(GamesServiceService);
  readonly items = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly displayFields: {path: string; labelKey: string}[] = [
  {
    "path": "Count",
    "labelKey": "external-api.games-service.search-games.fields.count"
  },
  {
    "path": "Message",
    "labelKey": "external-api.games-service.search-games.fields.message"
  },
  {
    "path": "SearchCriteria",
    "labelKey": "external-api.games-service.search-games.fields.search-criteria"
  },
  {
    "path": "Results",
    "labelKey": "external-api.games-service.search-games.fields.results"
  }
];
  readonly primaryField = "Count";

  constructor() {
    this.api.searchGames().pipe(takeUntilDestroyed()).subscribe({
      next: (records: any) => {
        this.items.set(Array.isArray(records) ? records : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  valueOf(item: any, path: string): unknown {
    return path.split('.').reduce((value: any, part: string) => value?.[part], item) ?? '—';
  }
}
