import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainStyle } from 'theme/style/main.style';
import { StoreContext } from 'context/';
import { FabContainer, Footer, MaintenanceWarning, Profile, ScrollTopFab } from 'components/';
import { TabWrapper } from './tabs.layout';

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { profile } = React.useContext(StoreContext);

  const upcomingMaintenanceWarning = React.useMemo(() => {
    if (!profile) {
      return {
        houses: [],
        rentals: [],
      };
    }
    return {
      houses: profile.houses.filter((house) => house.payed_for <= 72),
      rentals: profile.rentals.filter((rental) => rental.payed_for <= 72),
    };
  }, [profile]);

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
              {upcomingMaintenanceWarning.houses.length > 0 ||
                (upcomingMaintenanceWarning.rentals.length > 0 && (
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    {upcomingMaintenanceWarning.houses.map((house) => (
                      <Grid key={house.id} item xs={12} md={6}>
                        <MaintenanceWarning target={house} />
                      </Grid>
                    ))}

                    {upcomingMaintenanceWarning.rentals.map((rental) => (
                      <Grid key={rental.id} item xs={12} md={6}>
                        <MaintenanceWarning target={rental} />
                      </Grid>
                    ))}
                  </Grid>
                ))}

              <Outlet />
            </TabWrapper>
          </Grid>
        </Grid>
      </Container>
      <Footer sx={{ mt: 'auto' }} />
    </Box>
  );
};
