import { TabContext } from '@mui/lab';
import { Box, Tabs as MuiTabs, Paper, Tab } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Changelogs } from '../routes/changelogs.route';
import { Garage } from '../routes/garage.route';
import { Home } from '../routes/home.route';
import { Market } from '../routes/market.route';
import { Personal } from '../routes/personal.route';
import { Properties } from '../routes/properties.route';
import { Settings } from '../routes/settings.route';
import { Trader } from '../routes/trader.route';

export interface ContentTabProps {
  id: string;
  label: string;
  content: React.ReactNode | JSX.Element;
}

export const Tabs: ContentTabProps[] = [
  {
    id: '/home',
    label: 'Allgemeines',
    content: <Home />,
  },
  {
    id: '/personal',
    label: 'Persönliches',
    content: <Personal />,
  },
  {
    id: '/garage',
    label: 'Garage',
    content: <Garage />,
  },
  {
    id: '/properties',
    label: 'Immobilien',
    content: <Properties />,
  },
  {
    id: '/market',
    label: 'Markt',
    content: <Market />,
  },
  {
    id: '/trader',
    label: 'Händler',
    content: <Trader />,
  },
  {
    id: '/changelogs',
    label: 'Changelogs',
    content: <Changelogs />,
  },
  {
    id: '/settings',
    label: 'Einstellungen',
    content: <Settings />,
  },
];

export interface TabWrapperProps extends React.PropsWithChildren {}

export const TabWrapper: React.FC<TabWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
          >
            {Tabs.map(({ id, label }) => (
              <Tab key={id} value={id} label={label} onClick={() => navigate(id)} />
            ))}
          </MuiTabs>
        </Paper>

        <Box sx={{ my: 2 }}>{children}</Box>
      </TabContext>
    </React.Fragment>
  );
};
