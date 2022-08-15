import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { FunctionComponent } from 'react';

const Loader: FunctionComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
