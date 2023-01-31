import { CircularProgress, Paper } from '@mui/material';

export const Progress = () => {
  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
      <CircularProgress />
    </Paper>
  );
};
