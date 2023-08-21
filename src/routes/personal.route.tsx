import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { parseCurrency } from '@/utils';
import { StoreContext } from '@/context';
import { CreditCard, NoItems, Phone, PhonebookWrapper, Progress } from '@/components';
import i18next from '@/i18next';

export const Personal = () => {
  const { loading, profile, servers } = React.useContext(StoreContext);

  return (
    <React.Fragment>
      {loading ? (
        <Progress />
      ) : (
        <React.Fragment>
          <Typography variant="subtitle1" mb={1}>
            {i18next.t('online_banking_heading')}
          </Typography>
          <Grid container spacing={3}>
            {profile && profile.isOnline(servers) && profile.getBankAccounts().length > 0 && (
              <Grid item xs={12} md={12}>
                <Alert severity="warning">
                  <AlertTitle>{i18next.t('online_banking_disclaimer_heading')}</AlertTitle>
                  {i18next.t('online_banking_disclaimer_text')}
                </Alert>
              </Grid>
            )}

            {profile && profile.getBankAccounts().length > 0 ? (
              profile.getBankAccounts().map((account) => (
                <Grid key={account.iban} item xs={12} md={6} xl={4}>
                  <CreditCard
                    owner={account.owner}
                    iban={account.iban}
                    balance={account.balance}
                    defaultAccount={account.default_account}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <NoItems message={i18next.t('online_banking_no_accounts')} />
              </Grid>
            )}
          </Grid>

          <Typography variant="subtitle1" mt={2} mb={1}>
            {i18next.t('phones_heading')}
          </Typography>
          <Grid container spacing={1.5}>
            {loading ? (
              <Grid item xs={6} md={4} xl={3}>
                <Progress />
              </Grid>
            ) : profile && profile.phones.length > 0 ? (
              profile.phones
                .sort((a, b) => Number(a.disabled) - Number(b.disabled))
                .map((phone) => (
                  <Grid key={phone.phone} item xs={6} md={4} xl={3}>
                    <Phone phone={phone} />
                  </Grid>
                ))
            ) : (
              <Grid item xs={12}>
                <NoItems message={i18next.t('phones_no_phones')} />
              </Grid>
            )}
          </Grid>

          <Grid container mt={2} spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                {i18next.t('phonebooks_heading')}
              </Typography>
              <PhonebookWrapper phonebooks={profile ? profile.phonebooks : []} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                {i18next.t('licenses_heading')}
              </Typography>
              {profile && profile.licenses.length > 0 ? (
                <Paper>
                  <List dense>
                    {profile &&
                      profile.licenses.map((license, index) => (
                        <React.Fragment key={license.license + '-' + (Math.random() * 100).toFixed(0)}>
                          {index !== 0 ? <Divider /> : null}
                          <ListItem>
                            <ListItemText
                              primary={license.export_licence ? license.export_licence.name : license.license}
                              secondary={
                                license.export_licence ? (
                                  <Box>
                                    <Chip label={license.export_licence.side.getLabel()} sx={{ mr: 1 }} />
                                    <Chip
                                      icon={license.export_licence.illegal ? <CheckIcon /> : <CloseIcon />}
                                      label={i18next.t('license_illegal')}
                                      sx={{ mr: 1 }}
                                    />
                                    <Chip label={parseCurrency(license.export_licence.price)} />
                                  </Box>
                                ) : null
                              }
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                  </List>
                </Paper>
              ) : (
                <NoItems message={i18next.t('licenses_no_licenses')} />
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
