import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { fetchMarvelCharacters } from '../../api/marvel-service';
import { CharactersList } from '../../components/CharactersList/CharactersList';
import useObjectSearchParams from '../../hooks/useObjectSearchParam';
import { CharacterOrderBy, ICharacterFilterParams } from '../../types/api';
import { MarvelCharacter } from '../../types/marvel';

const defaultParams: ICharacterFilterParams = {
  orderBy: CharacterOrderBy.dateDesc
};

const HomePage = () => {
  const { objectSearchParams, setUrlSearchParams } = useObjectSearchParams();
  const [error, setError] = useState<string>('');
  const [characters, setCharacters] = useState<Array<MarvelCharacter>>([]);
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { nameStartsWith } = objectSearchParams;
  const [lastSearchedText, setLastSearchedText] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!!nameStartsWith && !inputText) {
      setInputText(nameStartsWith);
    }

    fetchMarvelCharacters({ ...defaultParams, ...objectSearchParams })
      .then((data) => {
        const charactersWithImage = data.filter(
          (character) => !character.thumbnail.path.endsWith('image_not_available')
        );

        setCharacters(charactersWithImage);
      })
      .catch((error) => {
        const { response } = error as AxiosError<{ code: string; status: string }>;

        setError(`${response?.data.status || error?.message}`);
      });
  }, [nameStartsWith]);

  const handleInputChange = (e: React.ChangeEvent) => {
    e.preventDefault();

    const enteredValue = inputRef.current?.value as string;

    if (enteredValue !== inputText) {
      setInputText(enteredValue);
    }
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (lastSearchedText === inputText) {
      return;
    }

    setLastSearchedText(inputText);

    const enteredNameStartsWithParameter = !inputText
      ? undefined
      : {
          nameStartsWith: inputText
        };
    const { nameStartsWith: localNameStartsWith, ...fixedSearchParams } = objectSearchParams;
    const finalParams = { ...fixedSearchParams, ...enteredNameStartsWithParameter };

    setUrlSearchParams(new URLSearchParams(finalParams));
  };

  return (
    <div className="App">
      <input ref={inputRef} type="text" onChange={handleInputChange} value={inputText} />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>
      <CharactersList characters={characters} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HomePage;
