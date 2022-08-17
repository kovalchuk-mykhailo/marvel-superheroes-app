import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, SxProps, Theme } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface NavigationBackButtonProps {
  sx?: SxProps<Theme> | undefined;
}

const NavigationBackButton: FunctionComponent<NavigationBackButtonProps> = ({ sx }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button sx={sx} onClick={() => navigate(-1)}>
      <ArrowBackIcon fontSize="large" />
    </Button>
  );
};

export default NavigationBackButton;
