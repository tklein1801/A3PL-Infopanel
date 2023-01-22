import { useScreenSize } from '@dulliag/components';
import {
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Progress } from '../components/progress.component';
import { Server, ServerProps } from '../components/server.component';
import { StoreContext } from '../context/store.context';
import { ReallifeService } from '../services/reallife.service';

export const Home = () => {
  const id = React.useId();
  const screenSize = useScreenSize();
  const { loading, setLoading, servers, setServers, selectedServer, setSelectedServer } =
    React.useContext(StoreContext);

  const handleServerClick: ServerProps['onClick'] = (server) => {
    setSelectedServer(server);
  };

  React.useEffect(() => {
    if (servers.length < 1) {
      setLoading(true);
      ReallifeService.getServers()
        .then((serverList) => {
          setServers(serverList);
          setSelectedServer(serverList.length >= 1 ? serverList[0] : null);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="subtitle1" mb={1}>
          Serverliste
        </Typography>
        {loading ? (
          <Progress />
        ) : screenSize === 'small' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'scroll',
              scrollSnapType: 'x mandatory',
              columnGap: '20px',
            }}
          >
            {servers.map((server) => (
              <Box
                key={`${id}-server-modile-${server.id}`}
                sx={{
                  minWidth: '100%',
                  scrollSnapAlign: 'start',
                }}
              >
                <Server
                  data={server}
                  onClick={handleServerClick}
                  active={selectedServer?.id === server.id}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Grid container spacing={3}>
            {servers.map((server) => (
              <Grid key={`${id}-server-desktop-${server.id}`} item xs={12} md={4}>
                <Server
                  data={server}
                  onClick={handleServerClick}
                  active={selectedServer?.id === server.id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {selectedServer ? (
        <Box mt={2}>
          <Typography variant="subtitle1" mb={1}>
            Spielerliste
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                {selectedServer.players.length > 0 ? (
                  selectedServer.players.map((player, index) => (
                    <Chip
                      key={player + '-' + index}
                      label={player}
                      size="small"
                      disabled={player.includes('(Lobby)')}
                      sx={{ mr: 0.5 }}
                    />
                  ))
                ) : (
                  <Typography textAlign="center">Keine Spieler online</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {/* {selectedServer ? (
        <Box mt={2}>
          <Typography variant="subtitle1" mb={1}>
            Spielerliste
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper>
                <List dense>
                  {selectedServer.players.length > 0 ? (
                    selectedServer.players.sort().map((player, index) => (
                      <React.Fragment>
                        {index !== 0 ? <Divider /> : null}
                        <ListItem>
                          <ListItemText primary={player} />
                        </ListItem>
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="Keine Spieler online" />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : null} */}
    </React.Fragment>
  );
};
