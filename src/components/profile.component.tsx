import { Payments as PaymentsIcon, PersonPinCircle as PersonPinCircleIcon } from '@mui/icons-material';
import { Avatar, Button, Grid, Link, Paper, PaperProps } from '@mui/material';
import { Panthor } from '@/constants';
import { format } from 'date-fns';
import React from 'react';
import { parseCurrency } from '@/utils';
import { IStoreContext } from '@/context';
import { LabelValue, LevelProgress } from '@/components';
import i18next from '@/i18next';

export interface ProfileProps extends PaperProps {
  profile: IStoreContext['profile'];
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
      <LabelValue label={i18next.t('profile_name_label')} value={profile.name} />
      <LabelValue label={i18next.t('profile_player_id_label')} value={profile.pid} withDivider />
      <LabelValue label={i18next.t('profile_cash_label')} value={parseCurrency(profile.cash)} withDivider />
      <LabelValue
        label={i18next.t('profile_bank_account_main_label')}
        value={parseCurrency(profile.bankacc)}
        withDivider
      />
      <LabelValue
        label={i18next.t('profile_experience_label')}
        value={profile.exp.toLocaleString() + ' XP.'}
        withDivider
      />
      <LabelValue label={i18next.t('profile_skillpoints_label')} value={profile.skillpoint + ' Punkte'} withDivider />
      <LabelValue
        label={i18next.t('profile_playtime_label')}
        value={active.toFixed(0) + ' ' + i18next.t('profile_playtime_hours')}
        withDivider
      />
      <LabelValue
        label={i18next.t('profile_playtime_total_label')}
        value={total.toFixed(0) + ' ' + i18next.t('profile_playtime_hours')}
        withDivider
      />
      <LabelValue
        label={i18next.t('profile_last_seen_label')}
        value={format(profile.last_seen.date, 'dd.MM.yy, HH:mm') + ' ' + i18next.t('profile_o_clock')}
        withDivider
      />
      <LabelValue
        label={i18next.t('profile_joined_at_label')}
        value={format(profile.joined_at, 'dd.MM.yy, HH:mm') + ' ' + i18next.t('profile_o_clock')}
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
