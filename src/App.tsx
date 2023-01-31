import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreContext } from './context/store.context';
import { AuthLayout } from './layout/auth.layout';
import { NonAuthLayout } from './layout/non-auth.layout';
import { Tabs } from './layout/tabs.layout';
import { MainStyle } from './theme/style/main.style';

export default function App() {
  const { profile, apiKey } = React.useContext(StoreContext);
  return (
    <Box sx={MainStyle}>
      <Routes>
        {apiKey && profile ? (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to={Tabs[0].path} />} />
            {Tabs.map((tab) => (
              <Route key={tab.path} path={tab.path.substring(1)} element={tab.content} />
            ))}
          </Route>
        ) : (
          <Route path="/" element={<NonAuthLayout />}>
            <Route index element={<Navigate to={Tabs[0].path} />} />
            {Tabs.filter((route) => !route.requiresAuth).map((tab) => (
              <Route key={tab.path} path={tab.path.substring(1)} element={tab.content} />
            ))}
          </Route>
        )}
      </Routes>
    </Box>
  );
}
