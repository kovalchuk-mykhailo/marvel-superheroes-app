import { useState } from 'react';
import { fetchMarvelCharacters } from '../api/marvel-service';
import { CharactersList } from '../components/CharactersList/CharactersList';
import useFirstRenderRef from '../hooks/useFirstRenderRef';
import { CharacterOrderBy, ICharacterFilterParams } from '../types/api';
import { MarvelCharacter } from '../types/marvel';
import './App.css';

function App() {
  const [error, setError] = useState<string>('');
  const [characters, setCharacters] = useState<Array<MarvelCharacter>>([]);

  useFirstRenderRef(() => {
    console.log(process.env.REACT_APP_MARVEL_API_PUBLIC_KEY);

    const params: ICharacterFilterParams = {
      orderBy: CharacterOrderBy.dateDesc,
      nameStartsWith: 'th'
    };

    fetchMarvelCharacters(params)
      .then((data) => {
        console.log('Response::', data);

        setCharacters(data);
      })
      .catch((error) => {
        console.log('ERROR::', error?.message);

        setError(`${error?.message}`);
      });
  });

  return (
    <div className="App">
      <CharactersList
        characters={characters.filter(
          (character) => !character.thumbnail.path.endsWith('image_not_available')
        )}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
