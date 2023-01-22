import {
  Payments as PaymentsIcon,
  PersonPinCircle as PersonPinCircleIcon,
} from '@mui/icons-material';
import { Avatar, Button, Grid, Link, Paper, PaperProps } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { LevelProgress } from '../components/level-progress.component';
import { StoreContext } from '../context/store.context';
import { parseCurrency } from '../utils/parseCurrency.util';
import { LabelValue } from './label-value.component';

export interface ProfileProps extends PaperProps {
  profile: StoreContext['profile'];
}

export const Profile: React.FC<ProfileProps> = ({ sx, profile }) => {
  if (!profile) return null;
  const { active, total } = profile.transformPlaytime();
  return (
    <Paper sx={{ p: 2, ...sx }}>
      <Avatar
        src={profile.avatar_full}
        sx={{
          width: { xs: '30%', md: '35%' },
          height: 'auto',
          mx: 'auto',
          boxShadow: (theme) => `0 0 0 0.25rem ${theme.palette.primary.main}`,
        }}
      />
      <LevelProgress currentLevel={profile.level} progress={profile.level_progress} withLabel />
      <LabelValue label="Name" value={profile.name} />
      <LabelValue label="PlayerId" value={profile.pid} withDivider />
      <LabelValue label="Bargeld" value={parseCurrency(profile.cash)} withDivider />
      <LabelValue
        label="Kontostand (Hauptkonto)"
        value={parseCurrency(profile.bankacc)}
        withDivider
      />
      <LabelValue label="XP" value={profile.exp.toLocaleString() + ' XP.'} withDivider />
      <LabelValue label="Skillpunkte" value={profile.skillpoint + ' Punkte'} withDivider />
      <LabelValue label="Spielzeit" value={active.toFixed(0) + ' Stunden'} withDivider />
      <LabelValue label="Volle Spielzeit" value={total.toFixed(0) + ' Stunden'} withDivider />
      <LabelValue
        label="Zuletzt gesehen"
        value={format(profile.last_seen.date, 'dd.MM.yy, HH:mm') + ' Uhr'}
        withDivider
      />
      <LabelValue
        label="Beigetreten"
        value={format(profile.joined_at, 'dd.MM.yy, HH:mm') + ' Uhr'}
        withDivider
      />

      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <Button LinkComponent={Link} href={profile.pos.getMapUrl()} target="_blank" fullWidth>
            <PersonPinCircleIcon />
          </Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button
            LinkComponent={Link}
            href={'https://spenden.realliferpg.de'}
            target="_blank"
            fullWidth
          >
            <PaymentsIcon />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
