import { Typography, styled } from '@mui/material';

export const Signature = styled(Typography)(({ theme }) => ({
  fontFamily: "'Cedarville Cursive', cursive",
  color: theme.palette.primary.main,
  transform: 'rotate(-1.8deg) skew(-2.5deg, 0)',
}));
