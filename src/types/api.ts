import { Method } from 'axios';

export enum EAPI {
  MARVEL = 'https://gateway.marvel.com:443'
}

export interface IAxiosParams {
  method: Method;
  url: string;
  params: unknown;
}

export enum CharacterOrderBy {
  name = 'name',
  nameDesc = '-name',
  date = 'modified',
  dateDesc = '-modified'
}
export enum ComicOrderBy {
  title = 'title',
  titleDesc = '-title',
  date = 'modified',
  dateDesc = '-modified',
  focDate = 'focDate'
}

export interface ICommonFilterParams {
  limit?: number;
  offset?: number;
  orderBy?: string;
}

export interface ICharacterFilterParams extends ICommonFilterParams {
  orderBy?: CharacterOrderBy;
  nameStartsWith?: string;
}

export interface IComicFilterParams extends ICommonFilterParams {
  orderBy?: ComicOrderBy;
  titleStartsWith?: string;
}

export interface IPageFilterParams {
  limit: number;
  offset: number;
}
