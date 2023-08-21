import { useScreenSize } from '@kleithor/components';
import { Box, Grid, Typography } from '@mui/material';
import { DATA_REFRESH_INTERVAL } from '@/constants';
import React from 'react';
import { PanthorService } from '@/services';
import { StoreContext } from '@/context';
import { NoItems, Playerlist, Progress, Server, ServerProps } from '@/components';

export const Home = () => {
  const id = React.useId();
  const screenSize = useScreenSize();
  const { loading, setLoading, servers, setServers, selectedServer, setSelectedServer } =
    React.useContext(StoreContext);

  const handleServerClick: ServerProps['onClick'] = (server) => {
    setSelectedServer(server);
  };

  const fetchServerData = () => {
    PanthorService.getServers()
      .then((serverList) => {
        setServers(serverList);
        setSelectedServer(serverList.length >= 1 ? serverList[0] : null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (servers.length < 1) {
      setLoading(true);
      fetchServerData();
    }
    const interval = setInterval(() => {
      fetchServerData();
    }, DATA_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="subtitle1" mb={1}>
          Serverliste
        </Typography>
        {loading ? (
          <Progress />
        ) : servers.length > 0 ? (
          screenSize === 'small' ? (
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
                  <Server data={server} onClick={handleServerClick} active={selectedServer?.id === server.id} />
                </Box>
              ))}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {servers.map((server) => (
                <Grid key={`${id}-server-desktop-${server.id}`} item xs={12} md={4}>
                  <Server data={server} onClick={handleServerClick} active={selectedServer?.id === server.id} />
                </Grid>
              ))}
            </Grid>
          )
        ) : (
          <NoItems message="Kein Server online" />
        )}
      </Box>

      {selectedServer && <Playerlist server={selectedServer} />}
    </React.Fragment>
  );
};
