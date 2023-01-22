import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layout/auth.layout';
import { Tabs } from './layout/tabs.layout';
import { MainStyle } from './theme/style/main.style';

export default function App() {
  return (
    <Box sx={MainStyle}>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to={Tabs[0].id} />} />
          {Tabs.map((tab) => (
            <Route key={tab.id} path={tab.id.substring(1)} element={tab.content} />
          ))}
        </Route>
      </Routes>
    </Box>
  );
}
