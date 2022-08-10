import { FunctionComponent } from 'react';
import { MarvelCharacter } from '../../types/marvel';
import { CharacterRow } from './CharacterRow/CharacterRow';

interface CharactersListProps {
  characters: Array<MarvelCharacter>;
}

export const CharactersList: FunctionComponent<CharactersListProps> = ({ characters }) => {
  return (
    <div>
      {characters.map((character) => (
        <CharacterRow key={character.id} character={character} />
      ))}
    </div>
  );
};
