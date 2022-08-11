import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { MarvelCharacter } from '../../../types/marvel';

interface CharacterRowProps {
  character: MarvelCharacter;
}

export const CharacterRow: FunctionComponent<CharacterRowProps> = ({ character }) => {
  const { id, name, description, thumbnail } = character;
  const imagePath = thumbnail.path + '.' + thumbnail.extension;

  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <Link to={`/characters/${id}`}>
        <img style={{ maxWidth: '100px' }} src={imagePath} alt={`${character.name} image`} />
      </Link>
    </div>
  );
};
