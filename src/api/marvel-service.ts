import { AxiosInstance, AxiosResponse, Method } from 'axios';
import { axiosRequest, getAxiosInstance } from '.';
import { EAPI, IQueryFilterParams, MarvelEndpoints } from '../types/Api';
import { MarvelCharacter, MarvelResponse } from '../types/MarvelTypes';

const marvelInstance: AxiosInstance = getAxiosInstance(EAPI.MARVEL);

const marvelRequest = <T>(method: Method, params: any): Promise<AxiosResponse<T>> => {
  return axiosRequest<T>(marvelInstance, method, MarvelEndpoints.HEROES, params);
};

export const getMarvelCharacters = async (
  params: IQueryFilterParams
): Promise<MarvelCharacter[]> => {
  const charactersResponse = await marvelRequest<MarvelResponse<MarvelCharacter>>('GET', {
    ...params,
    apikey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY as string
  });

  const characters: MarvelCharacter[] = charactersResponse.data.data.results;

  return characters;
};
