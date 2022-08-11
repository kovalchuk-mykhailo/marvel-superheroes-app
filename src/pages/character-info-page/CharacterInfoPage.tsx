import { AxiosError } from 'axios';
import { Fragment, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComicsByCharacterID } from '../../api/marvel-service';
import useFirstRenderRef from '../../hooks/useFirstRenderRef';
import { ComicOrderBy } from '../../types/api';
import { IMarvelComics } from '../../types/marvel';

export const CharacterInfoPage: FunctionComponent = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState<Array<IMarvelComics>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>({} as AxiosError);

  useFirstRenderRef(() => {
    setIsLoading(true);

    fetchComicsByCharacterID(+(characterId || 0), {
      orderBy: ComicOrderBy.title,
      limit: 2
    })
      .then((responseComics) => {
        setComics(responseComics);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const renderComics = () =>
    comics.length ? (
      comics.map((comic) => {
        const imagePath = comic.thumbnail.path + '.' + comic.thumbnail.extension;

        return (
          <Fragment key={comic.id}>
            <p>{comic.id}</p>
            <img src={imagePath} alt={`${comic.title} image`} />
          </Fragment>
        );
      })
    ) : (
      <p>No comics found</p>
    );

  const renderLoader = () => <p>Loading...</p>;

  return (
    <div>
      {isLoading ? renderLoader() : renderComics()}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CharacterInfoPage;
