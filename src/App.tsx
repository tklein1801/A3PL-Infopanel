import { Box } from '@mui/material';
import { NotAuthentificated } from '@/components';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreContext } from '@/context';
import { AuthLayout, NonAuthLayout, Tabs } from '@/layout';
import { MainStyle } from '@/theme/style/main.style';

export default function App() {
  const { authentificated } = React.useContext(StoreContext);
  return (
    <Box sx={MainStyle}>
      <Routes>
        <Route path="/" element={authentificated ? <AuthLayout /> : <NonAuthLayout />}>
          <Route index element={<Navigate to={Tabs[0].path} />} />
          {Tabs.map((tab) => (
            <Route
              key={tab.path}
              path={tab.path.substring(1)}
              element={
                tab.requiresAuth ? (
                  tab.requiresAuth && authentificated ? (
                    tab.content
                  ) : (
                    <NotAuthentificated />
                  )
                ) : (
                  tab.content
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </Box>
  );
}
