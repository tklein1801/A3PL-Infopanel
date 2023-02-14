import { East as EastIcon } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const NotAuthentificated = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 15,
        bounce: 10,
      }}
    >
      <Paper
        sx={{
          width: { xs: '100%', md: '30%', lg: '25%' },
          mx: 'auto',
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
    </motion.div>
  );
};
