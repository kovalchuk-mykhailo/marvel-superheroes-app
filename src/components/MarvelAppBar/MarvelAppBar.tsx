import { AppBar, Box, Link } from '@mui/material';
import { FunctionComponent } from 'react';

const MarvelAppBar: FunctionComponent = () => (
  <AppBar
    sx={{
      background:
        'url(https://freeimghost.net/images/2022/08/12/movie-avengers-infinity-war-black-panther-marvel-comics-black-widow-wallpaper-preview.jpg) content-box',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: 150
    }}
    position="static"
  >
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', m: 'auto 0.5rem' }}>
      <Link href="/">
        <img
          src="https://freeimghost.net/images/2022/08/12/marvel-logo-hd-5.png"
          alt="Marvel logo"
          style={{ maxWidth: 100, opacity: 0.7 }}
        />
      </Link>
    </Box>
  </AppBar>
);

export default MarvelAppBar;
