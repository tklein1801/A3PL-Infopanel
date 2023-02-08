import { NoSim as NoSimIcon, SimCard as SimCardIcon } from '@mui/icons-material';
import { Box, Chip, Paper, Typography } from '@mui/material';
import React from 'react';
import { Phone as PhoneModel } from 'types/';
import { Icon } from './base/icon.component';

export interface PhoneProps {
  phone: PhoneModel;
}

export const Phone: React.FC<PhoneProps> = ({ phone }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" flexDirection="row">
        <Icon icon={phone.disabled ? <NoSimIcon /> : <SimCardIcon />} />
        <Box sx={{ ml: 1 }}>
          <Typography variant="caption">{phone.getNoteLabel()}</Typography>
          <Typography variant="subtitle1">{phone.phone}</Typography>
          <Chip label={phone.side.getLabel()} variant="outlined" size="small" />
        </Box>
      </Box>
    </Paper>
  );
};
