import { Grid } from '@mui/material';
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
    <Grid container spacing={2}>
      {characters.length ? (
        characters.map((character) => (
          <Grid item xs={6} sm={4} md={2.4} key={character.id}>
            <CharacterRow character={character} />
          </Grid>
        ))
      ) : (
        <div>{textNoCharacters}</div>
      )}
    </Grid>
  );
};
