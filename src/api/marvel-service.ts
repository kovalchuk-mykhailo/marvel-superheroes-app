import { AxiosInstance, AxiosResponse } from 'axios';
import { axiosRequest, getAxiosInstance } from '.';
import { EAPI, IAxiosParams, ICharacterFilterParams, IComicFilterParams } from '../types/api';
import {
  IMarvelComics,
  MarvelCharacter,
  MarvelResponse,
  MarvelResponseData
} from '../types/marvel';
import { MarvelEndpoints } from '../utils/api-utils';

const marvelInstance: AxiosInstance = getAxiosInstance(EAPI.MARVEL);

const marvelRequest = <T>(axiosParams: IAxiosParams): Promise<AxiosResponse<T>> => {
  return axiosRequest<T>(marvelInstance, axiosParams);
};

export const fetchMarvelCharacters = async (
  filterParams?: ICharacterFilterParams
): Promise<MarvelResponseData<MarvelCharacter>> => {
  const charactersResponse = await marvelRequest<MarvelResponse<MarvelCharacter>>({
    method: 'GET',
    url: MarvelEndpoints.CHARACTERS,
    params: {
      ...filterParams,
      apikey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY as string
    }
  });

  const characters = charactersResponse.data.data;

  return characters;
};

export const fetchComicsByCharacterID = async (
  id: string,
  filterParams?: IComicFilterParams
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
