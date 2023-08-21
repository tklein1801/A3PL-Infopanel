import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainStyle } from '@/theme/style/main.style';
import { FabContainer, Footer, ScrollTopFab } from '@/components';
import { TabWrapper } from './tabs.layout';

export const NonAuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ ...MainStyle, flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <FabContainer>
          <ScrollTopFab />
        </FabContainer>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
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
