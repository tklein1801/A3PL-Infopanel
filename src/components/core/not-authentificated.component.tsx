import { East as EastIcon } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotAuthentificated = () => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        p: 1.5,
      }}
    >
      <Typography variant="h5" textAlign="center">
        API-Key fehlt
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button endIcon={<EastIcon />} onClick={() => navigate('/settings')}>
          Einstellungen
        </Button>
      </Box>
    </Paper>
  );
};
