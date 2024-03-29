import { Box, Button, Grid, Link, Paper, TextField, Typography, useTheme } from '@mui/material';
import { Panthor } from '@/constants';
import React from 'react';
import { PanthorService } from '@/services';
import { SnackbarContext, StoreContext } from '@/context';
import { Image, LabelValue } from '@/components';
import PCK from '../../package.json';
import i18next from '@/i18next';

export const Settings = () => {
  const { showSnackbar } = React.useContext(SnackbarContext);
  const { apiKey, setApiKey } = React.useContext(StoreContext);
  const theme = useTheme();
  const apiKeyInputRef = React.useRef<HTMLInputElement | null>(null);

  const handler = {
    onKeyDelete: () => {
      localStorage.removeItem('infopanel.apikey');
      setApiKey(null);
      showSnackbar({ message: i18next.t('settings_key_deleted') });
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
              message: i18next.t('settings_key_saved'),
              action: <Button onClick={handler.onKeyDelete}>{i18next.t('settings_key_delete_btn')}</Button>,
            });
          } else {
            showSnackbar({
              message: i18next.t('settings_key_invalid'),
              action: <Button onClick={handler.onKeySave}>{i18next.t('settings_key_retry')}</Button>,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          showSnackbar({
            message: i18next.t('settings_key_validation_failed'),
            action: <Button onClick={handler.onKeySave}>{i18next.t('settings_key_retry')}</Button>,
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
          <Typography variant="h6">{i18next.t('settings_heading')}</Typography>

          {/* API-Key */}
          <React.Fragment>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              App
            </Typography>

            <TextField label="API-Key" defaultValue={apiKey} inputRef={apiKeyInputRef} sx={{ width: '100%' }} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                mt: 1,
              }}
            >
              <Button onClick={handler.onKeyDelete} size="small">
                {i18next.t('settings_key_delete_btn')}
              </Button>
              <Button onClick={handler.onKeySave} variant="contained" size="small" sx={{ ml: 1 }}>
                {i18next.t('settings_key_save_btn')}
              </Button>
            </Box>
          </React.Fragment>
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
