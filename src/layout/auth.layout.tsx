import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainStyle } from 'theme/style/main.style';
import { StoreContext } from 'context/';
import { FabContainer, Footer, Profile, ScrollTopFab } from 'components/';
import { TabWrapper } from './tabs.layout';

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { profile } = React.useContext(StoreContext);

  return (
    <Box sx={{ ...MainStyle, flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <FabContainer>
          <ScrollTopFab />
        </FabContainer>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3} xl={3} order={{ xs: 1, md: 0 }}>
            <Profile
              profile={profile}
              sx={{
                position: { xs: 'unset', md: 'sticky' },
                top: (theme) => theme.spacing(2),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={9} xl={9} order={{ xs: 0, md: 1 }}>
            <TabWrapper>
              <Outlet />
            </TabWrapper>
          </Grid>
        </Grid>
      </Container>
      <Footer sx={{ mt: 'auto' }} />
    </Box>
  );
};
