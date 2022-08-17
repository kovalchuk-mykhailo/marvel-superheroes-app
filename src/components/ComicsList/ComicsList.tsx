import { Box, Grid } from '@mui/material';
import { FunctionComponent } from 'react';
import { MarvelComic } from '../../types/marvel';
import ComicRow from './ComicRow/ComicRow';

interface ComicsListProps {
  comics: Array<MarvelComic>;
  textNoComics?: string;
}

const ComicsList: FunctionComponent<ComicsListProps> = ({ comics, textNoComics = 'No comics' }) => {
  return (
    <Grid container spacing={2}>
      {comics.length ? (
        comics.map((comic) => (
          <Grid item xs={6} sm={3} md={2} key={comic.id}>
            <ComicRow comic={comic} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            m: '1rem',
            width: '100%'
          }}
        >
          <p>{textNoComics}</p>
        </Box>
      )}
    </Grid>
  );
};

export default ComicsList;
