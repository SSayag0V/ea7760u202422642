import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from './base-entity';
import {BaseEntityStringId} from './base-entity-special';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';


export abstract class BaseApiEndpoint<
  TEntity   extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  protected constructor(
    protected http:        HttpClient,
    protected endpointUrl: string,
    protected assembler:   TAssembler
  ) {}

  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response.map(r => this.assembler.toEntityFromResource(r));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/STN-${id}`).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }
  getByStringId(id: string): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    // Let json-server (or the real API) assign the new identifier.
    delete (resource as Partial<TResource>).id;
    return this.http.post<TResource>(
      this.endpointUrl, resource
    ).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  update(entity: TEntity, id: number): Observable<TEntity> {
    return this.http.put<TResource>(
      `${this.endpointUrl}/${id}`, this.assembler.toResourceFromEntity(entity)
    ).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to update entity'))
    );
  }
  updateStringId(entity: TEntity, id: string): Observable<TEntity> {
    return this.http.put<TResource>(
      `${this.endpointUrl}/${id}`, this.assembler.toResourceFromEntity(entity)
    ).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }
  deleteIdString(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let msg = operation;
      if (error.status === 404) msg = `${operation}: Resource not found`;
      else if (error.error instanceof ErrorEvent) msg = `${operation}: ${error.error.message}`;
      else msg = `${operation}: ${error.statusText || 'Unexpected error'}`;
      return throwError(() => new Error(msg));
    };
  }
}
