import { FunctionComponent } from 'react';
import { MarvelCharacter } from '../../types/marvel';
import { CharacterRow } from './CharacterRow/CharacterRow';

interface CharactersListProps {
  characters: Array<MarvelCharacter>;
  textNoCharacters?: string;
}

export const CharactersList: FunctionComponent<CharactersListProps> = ({
  characters,
  textNoCharacters = 'No characters'
}) => {
  return (
    <div>
      {characters.length ? (
        characters.map((character) => <CharacterRow key={character.id} character={character} />)
      ) : (
        <div>{textNoCharacters}</div>
      )}
    </div>
  );
};
