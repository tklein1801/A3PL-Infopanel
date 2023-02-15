import { Box, Button, Grid, Link, Paper, TextField, Typography, useTheme } from '@mui/material';
import { Panthor } from 'constants/';
import React from 'react';
import { PanthorService } from 'services/';
import { SnackbarContext, StoreContext } from 'context/';
import { Image, LabelValue } from 'components/';
import PCK from '../../package.json';

export const Settings = () => {
  const { showSnackbar } = React.useContext(SnackbarContext);
  const { apiKey, setApiKey } = React.useContext(StoreContext);
  const theme = useTheme();
  const apiKeyInputRef = React.useRef<HTMLInputElement | null>(null);

  const handler = {
    onKeyDelete: () => {
      localStorage.removeItem('infopanel.apikey');
      setApiKey(null);
      showSnackbar({
        message: 'API-Key gelöscht',
      });
    },
    onKeySave: () => {
      const value = apiKeyInputRef.current?.value;
      if (!value || value === apiKey) return;
      PanthorService.validateSecret(value)
        .then((status) => {
          if (status) {
            localStorage.setItem('infopanel.apikey', value);
            setApiKey(value);
            showSnackbar({
              message: 'API-Key gespeichert',
              action: <Button onClick={handler.onKeyDelete}>Löschen</Button>,
            });
          } else {
            showSnackbar({
              message: 'API-Key ungültig',
              action: <Button onClick={handler.onKeySave}>Wiederholen</Button>,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          showSnackbar({
            message: 'API-Key konnte nicht validiert werden',
            action: <Button onClick={handler.onKeySave}>Wiederholen</Button>,
          });
        });
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Link href="https://github.com/DulliAG/A3RLRPG-Infopanel" target="_blank">
            <Image
              src="https://opengraph.githubassets.com/27243bf731ee5a6df2277b9717adfb57fe3e680d279a028ff9e6455f47a8516d/DulliAG/A3RLRPG-Infopanel"
              alt="GitHub Repo Preview"
              style={{ width: '100%', borderRadius: `${theme.shape.borderRadius * 0.75}px` }}
              loading="eager"
            />
          </Link>
          <LabelValue label="Name" value="A3RLRPG-Infopanel" />
          <LabelValue label="Version" value={PCK.version} />
          <LabelValue label="Discord" value={'https://discord.gg/HhwUJcfPsR'} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Einstellungen
          </Typography>
          <TextField
            inputRef={apiKeyInputRef}
            label="API-Key"
            defaultValue={apiKey}
            size="small"
            sx={{ width: '100%' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <Button onClick={handler.onKeyDelete} size="small">
              Löschen
            </Button>
            <Button onClick={handler.onKeySave} variant="contained" size="small" sx={{ ml: 1 }}>
              Speichern
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Link href={Panthor.website} target="_blank">
            <Image
              src={Panthor.modPreview}
              alt="GitHub Repo Preview"
              style={{ width: '100%', borderRadius: `${theme.shape.borderRadius * 0.75}px` }}
              loading="eager"
            />
          </Link>
          <LabelValue label="Panthor Life Discord" value={Panthor.discordInvite} />
        </Paper>
      </Grid>
    </Grid>
  );
};
