import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import React from 'react';

export interface FabContainerProps extends React.PropsWithChildren, BoxProps {}

export const FabContainer: React.FC<FabContainerProps> = (props) => {
  return (
    <Box
      sx={{
        zIndex: (theme) => theme.zIndex.fab,
        position: 'fixed',
        right: 16,
        bottom: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '> * + *': {
          marginTop: 1,
        },
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};
