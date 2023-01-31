import { Box, Grid, SxProps, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { parseCurrency } from '../utils/parseCurrency.util';
import { Image } from './base/image.component';

export interface CreditCardProps {
  iban: string;
  owner: string;
  balance: number;
  defaultAccount?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  iban,
  owner,
  balance,
  defaultAccount = false,
}) => {
  const theme = useTheme();
  const style: Record<string, SxProps<Theme>> = {
    card: {
      transition: 'cursor 200ms',
      position: 'relative',
      p: 2,
      borderRadius: `${theme.shape.borderRadius}px`,
      backgroundColor: defaultAccount ? theme.palette.primary.dark : theme.palette.primary.main,
      ':hover': {
        cursor: 'pointer',
      },
    },
    label: { letterSpacing: '.5px' },
    container: {
      p: 1,
      borderRadius: `${theme.shape.borderRadius * 0.5}px`,
      backgroundColor: theme.palette.divider,
    },
    icon: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      width: '40px',
      height: '40px',
      borderRadius: `${theme.shape.borderRadius}px`,
    },
  };

  return (
    <Box
      sx={style.card}
      onClick={() => {
        if (window !== null) {
          // @ts-ignore
          window.open('https://info.panthor.de/banking/' + iban, '_blank').focus();
        }
      }}
    >
      <Typography variant="h4" fontWeight="bolder">
        NH-Bank
      </Typography>
      <Image
        src="https://raw.githubusercontent.com/DulliAG/A3RLRPG-Infopanel/main/src/img/rlrpg-logo.png"
        alt="NH Bank Logo"
        style={style.icon as React.CSSProperties}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption" sx={style.label}>
            IBAN
          </Typography>
          <Box sx={style.container}>
            <Typography>{iban}</Typography>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Typography variant="caption" sx={style.label}>
            Inhaber
          </Typography>
          <Box sx={style.container}>
            <Typography>{owner}</Typography>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Typography variant="caption" sx={style.label}>
            Saldo
          </Typography>
          <Box sx={style.container}>
            <Typography textAlign="right">{parseCurrency(balance)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
