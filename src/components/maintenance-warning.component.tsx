import { Room as RoomIcon } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Link, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { House, Rental } from 'types';

export interface MaintenanceWarningProps {
  target: House | Rental;
}

export const MaintenanceWarning: React.FC<MaintenanceWarningProps> = ({ target }) => {
  const isHouse = target instanceof House;
  return (
    <Alert severity="info">
      <AlertTitle>Achtung</AlertTitle>
      {isHouse ? (
        <Box>
          <Tooltip placement="bottom" title={target.payed_for + ' Stunden'}>
            <Typography>Dein Haus muss bis zum {format(target.active_until, 'dd.MM.yy')} gewartet werden!</Typography>
          </Tooltip>
          <Button
            size="small"
            startIcon={<RoomIcon />}
            LinkComponent={Link}
            href={target.getPosition().getMapUrl()}
            target="_blank"
          >
            Karte aufrufen
          </Button>
        </Box>
      ) : (
        <Tooltip placement="bottom" title={target.payed_for + ' Stunden'}>
          <Typography>
            Dein Mietvertrag muss bis zum {format(target.active_until, 'dd.MM.yy')} verlängert werden!
          </Typography>
        </Tooltip>
      )}
    </Alert>
  );
};
