import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider, StoreProvider } from './context/';
import i18n from './i18n';
import { theme } from './theme/default.theme';
import './theme/style/master.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <StoreProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </StoreProvider>
      </I18nextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
