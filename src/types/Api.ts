import { Method } from 'axios';

export enum EAPI {
  MARVEL = 'https://gateway.marvel.com:443'
}

export interface IAxiosParams {
  method: Method;
  url: string;
  params: any;
}

export type TOrderBy = 'name' | 'modified' | '-name' | '-modified';

export interface IQueryFilterParams {
  limit?: number;
  offset?: number;
  orderBy?: TOrderBy;
  nameStartsWith?: string;
}
