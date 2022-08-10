export enum EAPI {
  MARVEL = 'https://gateway.marvel.com:443'
}

export enum MarvelEndpoints {
  HEROES = '/v1/public/characters'
}

export type TOrderBy = 'name' | 'modified' | '-name' | '-modified';

export interface IQueryFilterParams {
  limit?: number;
  offset?: number;
  orderBy?: TOrderBy;
  nameStartsWith?: string;
}
