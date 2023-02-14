import { Box, BoxProps, Chip, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { RpgServer, Server } from 'types';
import { NoItems } from 'components/core';

export interface PlayerlistProps {
  server: RpgServer | Server;
}

export const Playerlist: React.FC<PlayerlistProps> = ({ server }) => {
  return (
    <Box mt={2}>
      <Typography variant="subtitle1" mb={1}>
        Spielerliste
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {server.players.length > 0 ? (
            <Paper sx={{ p: 2 }}>
              {'side' in server ? (
                <React.Fragment>
                  <PlayerlistSection side="civs" heading="Zivilisten" players={server.side.civs} />
                  <PlayerlistSection
                    side="medics"
                    heading="Abramier"
                    players={server.side.medics}
                  />
                  <PlayerlistSection side="rac" heading="RAC'ler" players={server.side.rac} />
                  <PlayerlistSection side="cops" heading="Polizisten" players={server.side.cops} />
                  <PlayerlistSection
                    side="justice"
                    heading="Justiz'ler"
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
            <NoItems message="Keine Spieler gefunden" />
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
