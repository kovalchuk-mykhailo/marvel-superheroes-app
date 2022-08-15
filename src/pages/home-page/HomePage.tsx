import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchMarvelCharacters } from '../../api/marvel-service';
import { CharactersList } from '../../components/CharactersList/CharactersList';
import Loader from '../../components/Loader/Loader';
import { PaginationBlock } from '../../components/PaginationBlock/PaginationBlock';
import useObjectSearchParams from '../../hooks/useObjectSearchParam';
import { CharacterOrderBy, ICharacterFilterParams, IPageFilterParams } from '../../types/api';
import { IVoidFunction } from '../../types/common-types';
import { MarvelCharacter, MarvelResponseData } from '../../types/marvel';

const defaultParams: ICharacterFilterParams = {
  orderBy: CharacterOrderBy.dateDesc
};

const pageRestrictions: IPageFilterParams = {
  limit: 12,
  offset: 0
};

const DEFAULT_PAGE = 1;

const HomePage = () => {
  const { objectSearchParams, urlSearchParams, setUrlSearchParams } = useObjectSearchParams();
  const [error, setError] = useState<string>('');
  const [characters, setCharacters] = useState<Array<MarvelCharacter>>([]);
  const [inputText, setInputText] = useState<string>('');
  const [lastSearchedText, setLastSearchedText] = useState<string | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log('Count: ', totalPages);
  console.log('urlSearchParams: ', urlSearchParams.toString());

  const getPage = (): number => {
    const pageString = urlSearchParams.get('page');

    return !pageString ? DEFAULT_PAGE : +pageString;
  };

  const setDefaultPage: IVoidFunction = () => {
    urlSearchParams.set('page', `${DEFAULT_PAGE}`);

    setUrlSearchParams(urlSearchParams);
  };

  useEffect(() => {
    console.log('FETCHING...');

    setIsLoading(true);

    const nameStartsWith = urlSearchParams.get('nameStartsWith');

    if (!!nameStartsWith && !inputText) {
      setInputText(nameStartsWith);
    }

    const pageParams: IPageFilterParams = {
      ...pageRestrictions
    };

    const page: string | null = urlSearchParams.get('page');

    if (page) {
      const step = pageRestrictions.limit * (+page - 1);

      pageParams.offset = step;
    }

    console.log('objectSearchParams: ', objectSearchParams);

    setLastSearchedText(nameStartsWith || '');

    fetchMarvelCharacters({ ...defaultParams, ...objectSearchParams, ...pageParams })
      .then((data) => {
        const { total, results }: MarvelResponseData<MarvelCharacter> = data;

        const totPag: number = total < 1 ? 1 : Math.ceil(total / pageRestrictions.limit);

        setTotalPages(totPag);

        const isPageAvailable: boolean = totPag > +(page ? page : 0);

        if (!isPageAvailable) {
          setDefaultPage();
        }

        setError('');
        setCharacters(results);
      })
      .catch((error) => {
        const { response } = error as AxiosError<{ code: string; status: string }>;

        if (characters.length) {
          setCharacters([]);
        }

        setTotalPages(1);

        setError(`${response?.data.status || error?.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [urlSearchParams.toString()]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const enteredValue = e.target.value;

    if (enteredValue !== inputText) {
      setInputText(enteredValue);
    }
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (error) {
      urlSearchParams.forEach((val, key) => {
        urlSearchParams.delete(key);
      });
    } else if (lastSearchedText === inputText) {
      console.log('lastSearchedText: ', typeof lastSearchedText);
      console.log('inputText: ', typeof inputText);

      return;
    }

    if (!inputText) {
      urlSearchParams.delete('nameStartsWith');
    } else {
      urlSearchParams.set('nameStartsWith', inputText);
    }

    urlSearchParams.delete('page');

    setUrlSearchParams(urlSearchParams);
    // EXPLORE change params in urlSearchParams
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    urlSearchParams.set('page', `${value}`);

    setUrlSearchParams(urlSearchParams);
  };

  const renderSearchBlock = () => {
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

      {isLoading ? <Loader /> : <CharactersList characters={characters} />}

      <PaginationBlock
        defaultPage={DEFAULT_PAGE}
        page={getPage()}
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
