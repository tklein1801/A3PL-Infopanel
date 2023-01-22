import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './context/store.context';
import { theme } from './theme/default.theme';
import './theme/style/master.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </ThemeProvider>
);
