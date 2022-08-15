import { AxiosError } from 'axios';
import { Fragment, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComicsByCharacterID } from '../../api/marvel-service';
import Loader from '../../components/Loader/Loader';
import useFirstRenderRef from '../../hooks/useFirstRenderRef';
import { ComicOrderBy } from '../../types/api';
import { IMarvelComics } from '../../types/marvel';

export const CharacterInfoPage: FunctionComponent = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState<Array<IMarvelComics>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | undefined>({} as AxiosError);

  useFirstRenderRef(() => {
    setIsLoading(true);

    fetchComicsByCharacterID(characterId || '', {
      orderBy: ComicOrderBy.title,
      limit: 20
    })
      .then((responseComics) => {
        setComics(responseComics);
        setError(undefined);
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
            <p>{comic.title}</p>
            <p>{comic.description}</p>
            <img src={imagePath} alt={`${comic.title} image`} style={{ maxHeight: 400 }} />
          </Fragment>
        );
      })
    ) : (
      <p>No comics found</p>
    );

  return (
    <div>
      {isLoading ? <Loader /> : renderComics()}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CharacterInfoPage;
