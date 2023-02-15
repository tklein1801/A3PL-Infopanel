import { PriceChange as PriceChangeIcon } from '@mui/icons-material';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { CopBonus as CopBonusModel } from 'types/';
import { Icon } from './base/icon.component';

export interface CopBonusProps {
  copsOnline: number;
}

export const CopBonus: React.FC<CopBonusProps> = ({ copsOnline }) => {
  const copBonus = new CopBonusModel(copsOnline);
  const multiplicator = copBonus.determineMultiplicator();
  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" flexDirection="row">
        <Icon icon={<PriceChangeIcon />} sx={{ width: '2.4rem', height: '2.4rem' }} />
        <Box sx={{ ml: { xs: 1, md: 2 } }}>
          <Tooltip title={`${copsOnline} Polizisten online`} placement="bottom">
            <Typography variant="h6">
              {multiplicator > 1 && '+ '}
              {Math.round(multiplicator * 100 - 100)}%
            </Typography>
          </Tooltip>
          <Typography variant="subtitle1">Polizei-Bonus</Typography>
          <Typography variant="subtitle2">
            {copsOnline} {copsOnline > 1 || copsOnline === 0 ? 'Polizisten' : 'Polizist'} online
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
