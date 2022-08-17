import { Box } from '@mui/material';
import { AxiosError } from 'axios';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComicsByCharacterID } from '../../api/marvel-service';
import ComicsList from '../../components/ComicsList/ComicsList';
import Loader from '../../components/Loader/Loader';
import NavigationBackButton from '../../components/NavigationBackButton/NavigationBackButton';
import useFirstRenderRef from '../../hooks/useFirstRenderRef';
import { MarvelComic } from '../../types/marvel';
import { characterInfoPageRestrictions } from '../../utils/character-info-page-utils';

export const CharacterInfoPage: FunctionComponent = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState<Array<MarvelComic>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | undefined>({} as AxiosError);

  useFirstRenderRef(() => {
    setIsLoading(true);

    fetchComicsByCharacterID(characterId || '', characterInfoPageRestrictions)
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

  return (
    <Box sx={{ m: '1rem' }}>
      <NavigationBackButton sx={{ m: '1rem' }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: '2rem'
        }}
      >
        {isLoading ? <Loader /> : <ComicsList comics={comics} />}
        {error && <p>{error.message}</p>}
      </Box>
    </Box>
  );
};

export default CharacterInfoPage;
