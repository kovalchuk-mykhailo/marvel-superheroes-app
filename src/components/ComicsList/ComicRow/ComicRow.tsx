import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { MarvelComic } from '../../../types/marvel';

interface ComicRowProps {
  comic: MarvelComic;
}

const ComicRow: FunctionComponent<ComicRowProps> = ({ comic }) => {
  const { title, description, thumbnail } = comic;
  const imagePath = thumbnail.path + '.' + thumbnail.extension;

  return (
    <Card>
      <CardMedia component="img" height="300" image={imagePath} alt={`${title} image`} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3
          }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComicRow;
