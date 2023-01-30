import { TabContext } from '@mui/lab';
import { Box, Tabs as MuiTabs, Paper, Tab } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/store.context';
import { Changelogs } from '../routes/changelogs.route';
import { Garage } from '../routes/garage.route';
import { Home } from '../routes/home.route';
import { Market } from '../routes/market.route';
import { Personal } from '../routes/personal.route';
import { Properties } from '../routes/properties.route';
import { Settings } from '../routes/settings.route';
import { Trader } from '../routes/trader.route';

export interface TabContent {
  requiresAuth?: boolean;
  path: string;
  label: string;
  content: React.ReactNode | JSX.Element;
}

export const Tabs: TabContent[] = [
  {
    requiresAuth: false,
    path: '/home',
    label: 'Allgemeines',
    content: <Home />,
  },
  {
    requiresAuth: true,
    path: '/personal',
    label: 'Persönliches',
    content: <Personal />,
  },
  {
    requiresAuth: true,
    path: '/garage',
    label: 'Garage',
    content: <Garage />,
  },
  {
    requiresAuth: true,
    path: '/properties',
    label: 'Immobilien',
    content: <Properties />,
  },
  {
    requiresAuth: false,
    path: '/market',
    label: 'Markt',
    content: <Market />,
  },
  {
    requiresAuth: false,
    path: '/trader',
    label: 'Händler',
    content: <Trader />,
  },
  {
    requiresAuth: false,
    path: '/changelogs',
    label: 'Changelogs',
    content: <Changelogs />,
  },
  {
    requiresAuth: false,
    path: '/settings',
    label: 'Einstellungen',
    content: <Settings />,
  },
];

export interface TabWrapperProps extends React.PropsWithChildren {}

export const TabWrapper: React.FC<TabWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { apiKey } = React.useContext(StoreContext);
  return (
    <React.Fragment>
      <TabContext value={location.pathname}>
        <Paper
          sx={{
            zIndex: (theme) => theme.zIndex.appBar,
            position: 'sticky',
            top: (theme) => ({ xs: theme.spacing(0), md: theme.spacing(2) }),
          }}
        >
          <MuiTabs
            value={location.pathname}
            onChange={(event, value) => navigate(value)}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons
            centered
          >
            {Tabs.filter((tab) => apiKey || (!apiKey && !tab.requiresAuth)).map(
              ({ path, label }) => (
                <Tab key={path} value={path} label={label} onClick={() => navigate(path)} />
              )
            )}
          </MuiTabs>
        </Paper>

        <Box sx={{ my: 2 }}>{children}</Box>
      </TabContext>
    </React.Fragment>
  );
};
