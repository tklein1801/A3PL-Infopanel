import { Box, BoxProps, Chip, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { RpgServer, Server } from '@/types';
import { NoItems } from '@/components/core';
import i18next from '@/i18next';

export interface PlayerlistProps {
  server: RpgServer | Server;
}

export const Playerlist: React.FC<PlayerlistProps> = ({ server }) => {
  return (
    <Box mt={2}>
      <Typography variant="subtitle1" mb={1}>
        {i18next.t('server_playerlist_heading')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {server.players.length > 0 ? (
            <Paper sx={{ p: 2 }}>
              {'side' in server ? (
                <React.Fragment>
                  <PlayerlistSection side="civs" heading={i18next.t('server_civ_label')} players={server.side.civs} />
                  <PlayerlistSection
                    side="medics"
                    heading={i18next.t('server_medic_label')}
                    players={server.side.medics}
                  />
                  <PlayerlistSection side="rac" heading={i18next.t('server_adac_label')} players={server.side.rac} />
                  <PlayerlistSection
                    side="cops"
                    heading={i18next.t('server_police_label')}
                    players={server.side.cops}
                  />
                  <PlayerlistSection
                    side="justice"
                    heading={i18next.t('server_doj_label')}
                    players={server.side.justice}
                  />
                </React.Fragment>
              ) : (
                server.players.map((player, index) => (
                  <Chip
                    key={player + '-' + index}
                    label={player}
                    size="small"
                    disabled={player.includes('(Lobby)')}
                    sx={{ mr: 0.5 }}
                  />
                ))
              )}
            </Paper>
          ) : (
            <NoItems message={i18next.t('server_playerlist_no_players')} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export interface PlayerlistSectionProps extends BoxProps {
  side: keyof RpgServer['side'];
  heading: string;
  players: string[];
}

export const PlayerlistSection: React.FC<PlayerlistSectionProps> = (props) => {
  const { players, heading, side } = props;
  if (players.length < 1) return null;
  return (
    <Box {...props}>
      <Typography variant="subtitle2">{heading}</Typography>
      {players.map((player, index) => (
        <Chip
          key={side + '-' + player + '-' + index}
          label={player}
          size="small"
          disabled={player.includes('(Lobby)')}
          sx={{ mr: 0.5 }}
        />
      ))}
    </Box>
  );
};
