import { Button, Grid, Link, Paper, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import PCK from '../../package.json';
import { Image, LabelValue } from '../components';
import { StoreContext } from '../context';
import { PanthorService } from '../services';

export const Settings = () => {
  const { apiKey, setApiKey } = React.useContext(StoreContext);
  const theme = useTheme();
  const apiKeyInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleKeyChange = () => {
    const value = apiKeyInputRef.current?.value;
    if (!value) return;
    PanthorService.validateSecret(value)
      .then((status) => {
        if (status) {
          localStorage.setItem('infopanel.apikey', value);
          setApiKey(value);
        } else {
          // TODO: Handle error
        }
      })
      .catch(console.error);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 1 }}>
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
        <Paper sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
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
          <Button onClick={handleKeyChange} size="small" sx={{ mt: 1, ml: 'auto' }}>
            Speichern
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 1 }}>
          <Link href="https://panthor.de" target="_blank">
            <Image
              src="https://support.panthor.de/uploads/N9J0C8rr.png"
              alt="GitHub Repo Preview"
              style={{ width: '100%', borderRadius: `${theme.shape.borderRadius * 0.75}px` }}
              loading="eager"
            />
          </Link>
          <LabelValue label="Panthor Life Discord" value={'https://discord.gg/Hf3XeAyn4h'} />
        </Paper>
      </Grid>
    </Grid>
  );
};
