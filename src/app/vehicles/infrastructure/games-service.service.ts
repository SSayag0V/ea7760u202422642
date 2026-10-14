import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 * HTTP service for GamesService external API.
 */
@Injectable({providedIn: 'root'})
export class GamesServiceService {
  private http = inject(HttpClient);

  searchGames(options: { params?: Record<string, unknown>; pathParams?: Record<string, unknown>; context?: Record<string, unknown> } = {}): Observable<any> {
    let url = environment.gamesServiceBaseUrl + environment.gamesServiceSearchGamesPath;
    const context = { ...(options.context || {}), ...(options.params || {}), ...(options.pathParams || {}) };
    const configuredParams: Record<string, unknown> = {};
    const interpolate = (value: unknown): any => typeof value === 'string' ? value.replace(/\{([^{}]+)\}/g, (_m: string, key: string) => String((context as any)[key] ?? '')) : value;
    url = url.replace("{category}", encodeURIComponent(String(interpolate("{category}") ?? '')));
let p = new HttpParams();
    configuredParams["category"] = interpolate("{category}");
    for (const [key, value] of Object.entries(options.params || {})) configuredParams[key] = interpolate(value);
    for (const [key, value] of Object.entries(configuredParams)) if (value !== undefined && value !== null && value !== '') p = p.set(key, String(value));
return this.http.request<any>("GET", url, { params: p }).pipe(
      map((res: any) => { let data: any = res;
    if (!Array.isArray(data)) throw new Error("gamesService.searchGames: se esperaba un array; revisa response.items_path / response_wrapper.");
    return data; }),
      catchError((error: any) => {  return throwError(() => new Error(`gamesService.searchGames HTTP ${error?.status ?? 'network error'}: GET ${url}`)); })
    );
  }
}
