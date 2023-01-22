import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import type { FabProps } from '@mui/material';
import { Fab, Zoom } from '@mui/material';
import React from 'react';

export interface ScrollTopFabInterface extends FabProps {}

export const ScrollTopFab: React.FC<ScrollTopFabInterface> = (props) => {
  const [showScrollTopBtn, setShowScrollTopBtn] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('scroll', (event) => setShowScrollTopBtn(window.scrollY > 100));
    return () => {
      document.removeEventListener('scroll', () => {});
    };
  });

  return (
    <Zoom
      in={showScrollTopBtn}
      timeout={{
        appear: 100,
        enter: 100,
        exit: 100,
      }}
      style={{
        transitionDelay: '100ms',
      }}
      unmountOnExit
    >
      <Fab
        sx={{
          color: 'common.white',
          backgroundColor: (theme) => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.main,
          },
          ...props.sx,
        }}
        color={'primary'}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
};
