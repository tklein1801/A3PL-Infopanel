import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface LevelProgressProps {
  currentLevel: number;
  progress: number;
  withLabel?: boolean;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  progress,
  withLabel = false,
}) => {
  return (
    <React.Fragment>
      {withLabel ? (
        <Box display="flex" justifyContent="space-between">
          <Typography>{currentLevel}</Typography>
          <Typography>{currentLevel + 1}</Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          width: '100%',
          height: '1.5rem',
          borderRadius: (theme) => `${theme.shape.borderRadius * 0.5}px`,
          backgroundColor: (theme) => theme.palette.primary.dark,
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: 'inherit',
            borderRadius: 'inherit',
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        ></Box>
      </Box>
    </React.Fragment>
  );
};
