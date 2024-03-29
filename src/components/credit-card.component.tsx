import { Box, Grid, SxProps, Theme, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import PANTHOR_LOGO from '@/ressources/panthor/panthor_logo.png';
import { parseCurrency } from '@/utils';
import { Image } from '@/components/base';
import { Panthor } from '@/constants';
import { SnackbarContext } from '@/context';
import i18next from '@/i18next';

export interface CreditCardProps {
  iban: string;
  owner: string;
  balance: number;
  defaultAccount?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({ iban, owner, balance, defaultAccount = false }) => {
  const theme = useTheme();
  const { showSnackbar } = React.useContext(SnackbarContext);
  const style: Record<string, SxProps<Theme>> = {
    card: {
      transition: 'cursor 200ms',
      position: 'relative',
      p: 2,
      borderRadius: `${theme.shape.borderRadius}px`,
      backgroundColor: defaultAccount ? theme.palette.primary.dark : theme.palette.primary.main,
      // ':hover': {
      //   cursor: 'pointer',
      // },
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
          window.open(Panthor.onlineBanking + '/' + iban, '_blank').focus();
        }
      }}
    >
      <Typography variant="h4" fontWeight="bolder">
        NH-Bank
      </Typography>
      <Image src={PANTHOR_LOGO} alt="NH Bank Logo" style={style.icon as React.CSSProperties} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption" sx={style.label}>
            {i18next.t('credit_card_owner')}
          </Typography>
          <Box sx={style.container}>
            <Typography>{owner}</Typography>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Tooltip title={i18next.t('credit_card_copy_adress')} placement="bottom">
            <Box
              onClick={(event) => {
                event.stopPropagation();
                navigator.clipboard.writeText(iban);
                showSnackbar({ message: i18next.t('credit_card_adress_copied') });
              }}
            >
              <Typography variant="caption" sx={style.label}>
                {i18next.t('credit_card_adress')}
              </Typography>
              <Box sx={style.container}>
                <Typography>{iban}</Typography>
              </Box>
            </Box>
          </Tooltip>
        </Grid>

        <Grid item xs={5}>
          <Typography variant="caption" sx={style.label}>
            {i18next.t('credit_card_balance')}
          </Typography>
          <Box sx={style.container}>
            <Typography textAlign="right">{parseCurrency(balance)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
