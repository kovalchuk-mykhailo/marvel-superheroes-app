import { AxiosError } from 'axios';
import { FunctionComponent, MouseEventHandler, useState } from 'react';
import { fetchComicsByCharacterID } from '../../../api/marvel-service';
import { ComicOrderBy } from '../../../types/api';
import { IMarvelComics, MarvelCharacter } from '../../../types/marvel';

interface CharacterRowProps {
  character: MarvelCharacter;
}

export const CharacterRow: FunctionComponent<CharacterRowProps> = ({ character }) => {
  const { id, name, description, thumbnail } = character;
  const imagePath = thumbnail.path + '.' + thumbnail.extension;

  const [comics, setComics] = useState<Array<IMarvelComics>>([]);
  const [error, setError] = useState(undefined);

  const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();

    fetchComicsByCharacterID(id, {
      orderBy: ComicOrderBy.title,
      limit: 2
    })
      .then((responseComics) => {
        setComics(responseComics);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return comics.length ? (
    <div>
      {comics.map((comic) => {
        const imagePath = comic.thumbnail.path + '.' + comic.thumbnail.extension;

        return (
          <>
            <p key={comic.id}>{comic.id}</p>
            <img src={imagePath} alt={`${comic.title} image`} />
          </>
        );
      })}
    </div>
  ) : (
    <div>
      {error && <p style={{ color: 'red' }}>{(error as AxiosError).message}</p>}
      <p>{name}</p>
      <p>{description}</p>
      <img
        style={{ maxWidth: '100px' }}
        src={imagePath}
        alt={`${character.name} image`}
        onClick={handleClick}
      />
    </div>
  );
};
