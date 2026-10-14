
import {BaseEntityStringId} from './base-entity-special';
import {BaseResourceStringId, BaseResponseStringId} from './base-response-special';


export interface BaseAssemblerString<
  TEntity   extends BaseEntityStringId,
  TResource extends BaseResourceStringId,
  TResponse extends BaseResponseStringId
> {
  toEntityFromResource(resource: TResource): TEntity;
  toResourceFromEntity(entity: TEntity): TResource;
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
