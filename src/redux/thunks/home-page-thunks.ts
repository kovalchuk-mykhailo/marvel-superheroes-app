import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fetchMarvelCharacters } from '../../api/marvel-service';
import { ICharacterFilterParams } from '../../types/api';
import { ICallbackFunction } from '../../types/common-types';
import { MarvelCharacter, MarvelResponseData } from '../../types/marvel';
import {
  DEFAULT_ORDER_BY_PARAM_VALUE,
  DEFAULT_PAGE_NUMBER,
  pageRestrictions
} from '../../utils/home-page-utils';
import {
  setCharacters,
  setCurrentPage,
  setErrorText,
  setLoading,
  setTotalPages
} from '../features/characters/charactersSlice';
import { setOrderByValue } from '../features/search-inputs/searchInputsSlice';
import { RootState } from '../store';

export const thunkFetchMarvelCharacters =
  (
    pageInappropriateCallback: ICallbackFunction,
    filterParams?: ICharacterFilterParams
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));

    const pageNumber = 1;
    fetchMarvelCharacters({ ...filterParams })
      .then((data) => {
        const { total, results }: MarvelResponseData<MarvelCharacter> = data;
        const totPag: number = total < 1 ? 1 : Math.ceil(total / pageRestrictions.limit);
        const isPageAppropriate: boolean = pageNumber > 0 && totPag >= pageNumber;

        if (!isPageAppropriate) {
          // setDefaultURLPage();
          pageInappropriateCallback();
          setCurrentPage(DEFAULT_PAGE_NUMBER);
        } else {
          setCurrentPage(pageNumber);
        }

        setTotalPages(totPag);
        setErrorText('');
        setCharacters(results);
      })
      .catch((error) => {
        const { response } = error as AxiosError<{ code: string; status: string }>;

        const {
          charactersState: { characters }
        } = getState();

        if (characters.length) {
          setCharacters([]);
        }

        setTotalPages(1);
        setCurrentPage(DEFAULT_PAGE_NUMBER);
        setErrorText(`${response?.data.status || error?.message}`);
        setOrderByValue(DEFAULT_ORDER_BY_PARAM_VALUE);
      })
      .finally(() => {
        setLoading(false);
      });
  };
