import { Paper, Typography } from '@mui/material';
import React from 'react';

export interface NoItemsProps {
  message?: string;
}

export const NoItems: React.FC<NoItemsProps> = ({ message = 'Keine Ergebnisse' }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography textAlign="center">{message}</Typography>
    </Paper>
  );
};
