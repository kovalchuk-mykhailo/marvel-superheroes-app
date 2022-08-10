import { AxiosInstance, AxiosResponse } from 'axios';
import { axiosRequest, getAxiosInstance } from '.';
import { EAPI, IAxiosParams, IQueryFilterParams } from '../types/Api';
import { IMarvelComics, MarvelCharacter, MarvelResponse } from '../types/MarvelTypes';
import { MarvelEndpoints } from '../utils/api-utils';

const marvelInstance: AxiosInstance = getAxiosInstance(EAPI.MARVEL);

const marvelRequest = <T>(axiosParams: IAxiosParams): Promise<AxiosResponse<T>> => {
  return axiosRequest<T>(marvelInstance, axiosParams);
};

export const fetchMarvelCharacters = async (
  filterParams?: IQueryFilterParams
): Promise<MarvelCharacter[]> => {
  const charactersResponse = await marvelRequest<MarvelResponse<MarvelCharacter>>({
    method: 'GET',
    url: MarvelEndpoints.CHARACTERS,
    params: {
      ...filterParams,
      apikey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY as string
    }
  });

  const characters: MarvelCharacter[] = charactersResponse.data.data.results;

  return characters;
};

export const fetchComicsByCharacterID = async (
  id: number,
  filterParams?: IQueryFilterParams
): Promise<Array<IMarvelComics>> => {
  const comicsResponse = await marvelRequest<MarvelResponse<IMarvelComics>>({
    method: 'GET',
    url: MarvelEndpoints.comicsByCharacterIDPattern(id),
    params: {
      ...filterParams,
      apikey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY as string
    }
  });

  const comics: Array<IMarvelComics> = comicsResponse.data.data.results;

  return comics;
};
