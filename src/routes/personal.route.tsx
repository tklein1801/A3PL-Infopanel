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
import { BankAccount } from 'types/';
import { parseCurrency } from 'utils/';
import { StoreContext } from 'context/';
import { CreditCard, NoItems, Phone, PhonebookWrapper, Progress } from 'components/';

export const Personal = () => {
  const { loading, profile, servers } = React.useContext(StoreContext);

  const bankAccounts = React.useMemo(() => {
    if (!profile) return [] as BankAccount[];
    // There is no need to check if the property bank_details is given, because all active companies will have them
    const activeCompanies = profile.getActiveCompanies();
    const companyBankAccounts = activeCompanies.flatMap((company) => company.getBankAccounts());
    return [...profile.bank_main, ...companyBankAccounts];
  }, [profile]);

  return (
    <React.Fragment>
      {loading ? (
        <Progress />
      ) : (
        <React.Fragment>
          <Typography variant="subtitle1" mb={1}>
            Online Banking
          </Typography>
          <Grid container spacing={3}>
            {profile && profile.isOnline(servers) && bankAccounts.length > 0 && (
              <Grid item xs={12} md={12}>
                <Alert severity="warning">
                  <AlertTitle>Achtung</AlertTitle>
                  Solange du auf dem Server bist kannst du nicht auf das Online Banking zugreifen.
                </Alert>
              </Grid>
            )}

            {bankAccounts.length > 0 ? (
              bankAccounts.map((account) => (
                <Grid key={account.id} item xs={12} md={6} xl={4}>
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
                <NoItems message="Keine Konten gefunden" />
              </Grid>
            )}
          </Grid>

          <Typography variant="subtitle1" mt={2} mb={1}>
            Handys
          </Typography>
          <Grid container spacing={3}>
            {loading ? (
              <Grid item xs={6} md={4} xl={3}>
                <Progress />
              </Grid>
            ) : profile && profile.phones.length > 0 ? (
              profile?.phones
                .sort((a, b) => Number(a.disabled) - Number(b.disabled))
                .map((phone) => (
                  <Grid key={phone.phone} item xs={6} md={4} xl={3}>
                    <Phone phone={phone} />
                  </Grid>
                ))
            ) : (
              <Grid item xs={12}>
                {' '}
                <NoItems message="Keine Handys gefunden" />
              </Grid>
            )}
          </Grid>

          <Grid container mt={2} spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Telefonbücher
              </Typography>
              <PhonebookWrapper phonebooks={profile ? profile.phonebooks : []} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Lizenzen
              </Typography>
              {profile && profile.licenses.length > 0 ? (
                <Paper>
                  <List dense>
                    {profile?.licenses.map((license, index) => (
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
                                    label="Illegal"
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
                <NoItems message="Keine Lizenen gefunden" />
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
