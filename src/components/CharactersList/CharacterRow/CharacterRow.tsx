import { Button, CardActionArea, CardActions, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { MarvelCharacter } from '../../../types/marvel';

interface CharacterRowProps {
  character: MarvelCharacter;
}

export const CharacterRow: FunctionComponent<CharacterRowProps> = ({ character }) => {
  const { id, name, description, thumbnail } = character;
  const imagePath = thumbnail.path + '.' + thumbnail.extension;

  return (
    <Link href={`/characters/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imagePath}
            alt={`${character.name} image`}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
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
        </CardActionArea>

        <CardActions>
          <Button size="small" color="primary">
            View more
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};
