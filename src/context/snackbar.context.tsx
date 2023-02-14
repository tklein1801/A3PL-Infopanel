import { Snackbar } from '@mui/material';
import React from 'react';

export interface ShowSnackbarProps {
  message: string;
  action?: React.ReactNode;
}

export interface SnackbarProps extends ShowSnackbarProps {
  key: number;
}

export interface SnackbarContext {
  showSnackbar: (props: ShowSnackbarProps) => void;
}

export const SnackbarContext = React.createContext({} as SnackbarContext);

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarProps[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarProps | undefined>(undefined);

  const showSnackbar = (props: ShowSnackbarProps) => {
    setSnackPack((prev) => [
      ...prev,
      { message: props.message, action: props.action, key: new Date().getTime() },
    ]);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        sx={{
          bottom: (theme) => ({ xs: theme.spacing(10), md: theme.spacing(2) }),
          '& .MuiSnackbarContent-root': {
            backgroundColor: (theme) => theme.palette.background.default,
            color: 'white',
          },
        }}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={messageInfo ? messageInfo.action : undefined}
      />
    </SnackbarContext.Provider>
  );
};
