import { Box, Button, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import { fetchMarvelCharacters } from '../../api/marvel-service';
import { CharactersList } from '../../components/CharactersList/CharactersList';
import { MUISelect } from '../../components/MUISelect/MUISelect';
import { PaginationBlock } from '../../components/PaginationBlock/PaginationBlock';
import useObjectSearchParams from '../../hooks/useObjectSearchParam';
import { CharacterOrderBy, IPageFilterParams } from '../../types/api';
import { ICallbackFunction, StringOrNull } from '../../types/common-types';
import { MarvelCharacter, MarvelResponseData } from '../../types/marvel';
import {
  DEFAULT_ORDER_BY_PARAM_VALUE,
  DEFAULT_PAGE_NUMBER,
  orderByItems,
  orderByParams,
  pageRestrictions
} from '../../utils/home-page-utils';
import { doesObjectContain } from '../../utils/object-utils';

const HomePage = () => {
  // const charactersState = useAppSelector(selectCharactersState);
  // const dispatch = useAppDispatch();
  const { objectSearchParams, urlSearchParams, setUrlSearchParams } = useObjectSearchParams();
  // {...logic}

  const [error, setError] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [lastSearchedText, setLastSearchedText] = useState<string | undefined>(undefined);
  const [characters, setCharacters] = useState<Array<MarvelCharacter>>([]);
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderByValue, setOrderByValue] = useState<CharacterOrderBy>(DEFAULT_ORDER_BY_PARAM_VALUE);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);

  const setDefaultURLPage: ICallbackFunction = () => {
    urlSearchParams.set('page', `${DEFAULT_PAGE_NUMBER}`);

    setUrlSearchParams(urlSearchParams);
  };

  const getPageNumberFromUrl: () => number = () => {
    const page: StringOrNull = urlSearchParams.get('page');

    if (typeof page === 'string') {
      const pageNumber = Number(page);

      if (typeof pageNumber === 'number') {
        return pageNumber;
      }
    }

    return DEFAULT_PAGE_NUMBER;
  };

  // console.log('charactersState:: ', JSON.stringify(charactersState));
  console.log('urlSearchParams.toString():: ', urlSearchParams.toString());
  console.log('props:: ', isLoading, inputText, lastSearchedText);

  useEffect(() => {
    console.log('FETCHING...', objectSearchParams, urlSearchParams.toString());

    setIsLoading(true);

    const pageParams: IPageFilterParams = {
      ...pageRestrictions
    };
    const pageNumber: number = getPageNumberFromUrl();
    const isPageNumberUnavailable = pageNumber < 1;

    if (isPageNumberUnavailable) {
      setDefaultURLPage();

      return;
    }

    const nameStartsWith: StringOrNull = urlSearchParams.get('nameStartsWith');
    const isNameNew = !!nameStartsWith && (!inputText || lastSearchedText !== nameStartsWith);

    if (isNameNew) {
      setInputText(nameStartsWith);
    }

    setLastSearchedText(nameStartsWith || '');

    const step: number = pageParams.limit * (pageNumber - 1);

    pageParams.offset = step;

    const orderBy: StringOrNull = urlSearchParams.get('orderBy');

    if (orderBy) {
      orderByParams.orderBy = orderBy as CharacterOrderBy;

      if (doesObjectContain(orderBy, CharacterOrderBy)) {
        const newOrderBy = orderBy as CharacterOrderBy;

        setOrderByValue(newOrderBy);
      }
    }

    fetchMarvelCharacters({ ...objectSearchParams, ...orderByParams, ...pageParams })
      .then((data) => {
        const { total, results }: MarvelResponseData<MarvelCharacter> = data;
        const totPag: number = total < 1 ? 1 : Math.ceil(total / pageRestrictions.limit);
        const isPageAppropriate: boolean = pageNumber > 0 && totPag >= pageNumber;

        // dispatch(
        //   setPaginatedCharacters({
        //     characters: results,
        //     pagination: {
        //       totalPages: totPag,
        //       currentPage: pageNumber
        //     }
        //   })
        // );
        // setIsLoading(false);

        if (!isPageAppropriate) {
          setDefaultURLPage();
          setCurrentPage(DEFAULT_PAGE_NUMBER);
        } else {
          setCurrentPage(pageNumber);
        }

        setTotalPages(totPag);
        setError('');
        setCharacters(results);
      })
      .catch((error) => {
        const { response } = error as AxiosError<{ code: string; status: string }>;

        if (characters.length) {
          setCharacters([]);
        }

        setTotalPages(1);
        setCurrentPage(DEFAULT_PAGE_NUMBER);
        setError(`${response?.data.status || error?.message}`);
        setOrderByValue(DEFAULT_ORDER_BY_PARAM_VALUE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [urlSearchParams.toString()]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const enteredValue = e.target.value;

    if (enteredValue !== inputText) {
      setInputText(enteredValue);
    }
  };

  const applySearch: ICallbackFunction = () => {
    if (error) {
      urlSearchParams.forEach((val, key) => {
        urlSearchParams.delete(key);
      });
    } else if (lastSearchedText === inputText) {
      return;
    }

    if (!inputText) {
      urlSearchParams.delete('nameStartsWith');
    } else {
      urlSearchParams.set('nameStartsWith', inputText);
    }

    urlSearchParams.set('page', `${DEFAULT_PAGE_NUMBER}`);
    urlSearchParams.set('orderBy', orderByValue);

    setUrlSearchParams(urlSearchParams);
  };

  const handleSearchClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    applySearch();
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, clickedPage: number): void => {
    if (clickedPage === currentPage) {
      return;
    }

    urlSearchParams.set('page', `${clickedPage}`);

    setUrlSearchParams(urlSearchParams);
    setCurrentPage(clickedPage);
  };

  const handleOrderByItemChange = (event: SelectChangeEvent<string>): void => {
    setOrderByValue(event.target.value as CharacterOrderBy);

    urlSearchParams.set('orderBy', event.target.value);
    setUrlSearchParams(urlSearchParams);
    setDefaultURLPage();
  };

  const handleSelectOnKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Enter':
        applySearch();
        break;

      default:
        break;
    }
  };

  const renderSearchBlock: () => JSX.Element = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '1rem'
        }}
      >
        <TextField
          value={inputText}
          id="outlined-search"
          label="Name"
          onChange={handleInputChange}
          type="search"
          style={{ margin: '1rem' }}
          onKeyDown={handleSelectOnKeyDown}
        />

        <MUISelect
          items={orderByItems}
          currentItem={orderByValue}
          label="Order by"
          onChange={handleOrderByItemChange}
        />

        <Button variant="contained" onClick={handleSearchClick}>
          Search
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: '1rem'
      }}
    >
      {renderSearchBlock()}

      {<CharactersList characters={characters} />}

      <PaginationBlock
        defaultPage={DEFAULT_PAGE_NUMBER}
        page={currentPage}
        onChange={handlePaginationChange}
        count={totalPages}
        color="primary"
      />

      {error && (
        <Typography variant="h2" color="red">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;
