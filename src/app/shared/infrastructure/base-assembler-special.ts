import {BaseResource, BaseResponse} from './base-response';
import {BaseEntityStringId} from './base-entity-special';


export interface BaseAssemblerString<
  TEntity   extends BaseEntityStringId,
  TResource extends BaseResource,
  TResponse extends BaseResponse
> {
  toEntityFromResource(resource: TResource): TEntity;
  toResourceFromEntity(entity: TEntity): TResource;
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
