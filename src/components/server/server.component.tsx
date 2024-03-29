import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { RpgServer, Server as ServerModel } from '@/types';
import i18next from '@/i18next';

export interface ServerProps {
  data: RpgServer | ServerModel;
  onClick?: (server: RpgServer | ServerModel) => void;
  active?: boolean;
}

export const Server: React.FC<ServerProps> = ({ data, onClick, active = false }) => {
  return (
    <Paper
      sx={{
        transition: 'borderColor 100ms',
        height: '100%',
        p: 2,
        border: '2px solid transparent',
        borderColor: (theme) => (active ? theme.palette.primary.main : 'transparent'),
        ':hover': {
          cursor: 'pointer',
          borderColor: (theme) => theme.palette.primary.light,
        },
      }}
      onClick={() => {
        if (onClick) onClick(data);
      }}
    >
      <Typography variant="subtitle1">{data.servername}</Typography>
      <Typography variant="subtitle2">
        {i18next.t('server_online')} {data.playercount}/{data.slots}
      </Typography>
      <Grid container>
        {data instanceof RpgServer ? (
          <React.Fragment>
            <Grid item xs={6}>
              <Typography gridColumn={1}>
                {i18next.t('server_civ_label')}: {data.civilians}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gridColumn={1}>
                {i18next.t('server_medic_label')}: {data.medics}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gridColumn={1}>
                {i18next.t('server_adac_label')}: {data.rac}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gridColumn={1}>
                {i18next.t('server_police_label')}: {data.cops}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gridColumn={1}>
                {i18next.t('server_doj_label')}: {data.justice}
              </Typography>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={6}>
            <Typography gridColumn={1}>
              {i18next.t('server_player_label')}: {data.players.length}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
