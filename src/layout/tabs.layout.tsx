import { TabContext } from '@mui/lab';
import { Box, Tabs as MuiTabs, Paper, Tab } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Changelogs, Garage, Home, Market, Personal, Properties, Settings, Trader } from '@/routes';
import i18next from '@/i18next';

export interface TabContent {
  requiresAuth: boolean;
  path: string;
  label: string;
  content: React.ReactNode | JSX.Element;
}

export const Tabs: TabContent[] = [
  {
    requiresAuth: false,
    path: '/home',
    label: i18next.t('tab_home'),
    content: <Home />,
  },
  {
    requiresAuth: true,
    path: '/personal',
    label: i18next.t('tab_personal'),
    content: <Personal />,
  },
  {
    requiresAuth: true,
    path: '/garage',
    label: i18next.t('tab_garage'),
    content: <Garage />,
  },
  {
    requiresAuth: true,
    path: '/properties',
    label: i18next.t('tab_properties'),
    content: <Properties />,
  },
  {
    requiresAuth: false,
    path: '/market',
    label: i18next.t('tab_market'),
    content: <Market />,
  },
  {
    requiresAuth: false,
    path: '/trader',
    label: i18next.t('tab_traders'),
    content: <Trader />,
  },
  {
    requiresAuth: false,
    path: '/changelogs',
    label: i18next.t('tab_changelogs'),
    content: <Changelogs />,
  },
  {
    requiresAuth: false,
    path: '/settings',
    label: i18next.t('tab_settings'),
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
            onChange={(_event, value) => navigate(value)}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons
          >
            {Tabs.map(({ path, label }) => (
              <Tab key={path} value={path} label={label} onClick={() => navigate(path)} />
            ))}
          </MuiTabs>
        </Paper>

        <Box sx={{ my: 2 }}>{children}</Box>
      </TabContext>
    </React.Fragment>
  );
};
