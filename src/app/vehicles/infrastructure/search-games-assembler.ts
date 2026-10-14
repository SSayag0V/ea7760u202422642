export class SearchGamesAssembler {
  static toEntity(raw: any): any {
    const entity: any = {};
    entity['count'] = raw?.Count;
    entity['message'] = raw?.Message;
    entity['searchCriteria'] = raw?.SearchCriteria;
    entity['results'] = raw?.Results;
    return entity;
  }
  static toEntityList(raws: any[]): any[] {
    return (raws ?? []).map((r: any) => this.toEntity(r));
  }
}
