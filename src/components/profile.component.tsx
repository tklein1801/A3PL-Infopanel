import { Payments as PaymentsIcon, PersonPinCircle as PersonPinCircleIcon } from '@mui/icons-material';
import { Avatar, Button, Grid, Link, Paper, PaperProps } from '@mui/material';
import { Panthor } from 'constants/';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { parseCurrency } from 'utils/';
import { IStoreContext } from 'context/';
import { LabelValue, LevelProgress } from 'components/';

export interface ProfileProps extends PaperProps {
  profile: IStoreContext['profile'];
}

export const Profile: React.FC<ProfileProps> = ({ sx, profile }) => {
  const { t } = useTranslation();
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
      <LabelValue label={t('profile.name') ?? ''} value={profile.name} />
      <LabelValue label={t('profile.playerId') ?? ''} value={profile.pid} withDivider />
      <LabelValue label={t('profile.cash') ?? ''} value={parseCurrency(profile.cash)} withDivider />
      <LabelValue label={t('profile.bank_acc') ?? ''} value={parseCurrency(profile.bankacc)} withDivider />
      <LabelValue
        label={t('profile.xp') ?? ''}
        value={profile.exp.toLocaleString() + ' ' + t('profile.xp') ?? ''}
        withDivider
      />
      <LabelValue
        label={t('profile.skillpoints') ?? ''}
        value={profile.skillpoint + ' ' + t('profile.skillpoints_points') ?? ''}
        withDivider
      />
      <LabelValue
        label={t('profile.playtime') ?? ''}
        value={active.toFixed(0) + ' ' + t('profile.hours') ?? ''}
        withDivider
      />
      <LabelValue
        label={t('profile.playtime_total') ?? ''}
        value={total.toFixed(0) + ' ' + t('profile.hours') ?? ''}
        withDivider
      />
      <LabelValue
        label="Zuletzt gesehen"
        value={format(profile.last_seen.date, 'dd.MM.yy, HH:mm') + ' ' + t('profile.clock') ?? ''}
        withDivider
      />
      <LabelValue
        label="Beigetreten"
        value={format(profile.joined_at, 'dd.MM.yy, HH:mm') + ' ' + t('profile.clock') ?? ''}
        withDivider
      />

      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <Button LinkComponent={Link} href={profile.pos.getMapUrl()} target="_blank" fullWidth>
            <PersonPinCircleIcon />
          </Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button LinkComponent={Link} href={Panthor.shop} target="_blank" fullWidth>
            <PaymentsIcon />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
