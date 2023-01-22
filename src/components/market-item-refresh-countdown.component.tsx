import { AvTimer as AvTimerIcon } from '@mui/icons-material';
import { Box, Paper, PaperProps, Typography } from '@mui/material';
import { addSeconds, format } from 'date-fns';
import React from 'react';
import { Icon } from './base/icon.component';

export interface MarketItemRefreshCountdownProps extends PaperProps {
  refresh: Date;
  /** Interval in seconds */
  interval: number;
}

export const MarketItemRefreshCountdown: React.FC<MarketItemRefreshCountdownProps> = (props) => {
  const [recalcDate, setRecalcDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const { refresh, interval } = props;

    if (!recalcDate || (recalcDate && recalcDate <= new Date()))
      setRecalcDate(addSeconds(refresh, interval));

    const checking = setInterval(() => {
      if (!recalcDate || recalcDate <= new Date()) {
        setRecalcDate(addSeconds(recalcDate ?? new Date(), interval));
      }
      // if (recalcDate && recalcDate >= new Date()) {
      //   console.log('all tine');
      // } else {
      //   console.log(recalcDate);
      //   console.log('renew recalcDate');
      //   setRecalcDate(addSeconds(recalcDate ?? new Date(), interval));
      // }
    }, (interval * 1000) / 20); // FIXME: Improve me, so I won't cycle if not required

    return () => {
      clearInterval(checking);
    };
  }, [props.refresh, recalcDate]);

  if (!recalcDate) return null;
  return (
    <Paper {...props} sx={{ p: 2, ...props.sx }}>
      <Box display="flex" flexDirection="row">
        <Icon icon={<AvTimerIcon />} sx={{ width: '2.4rem', height: '2.4rem' }} />
        <Box sx={{ ml: { xs: 1, md: 2 } }}>
          <Typography variant="h6">{format(recalcDate as Date, 'HH:mm:ss')} Uhr</Typography>
          <Typography variant="subtitle1">Preisberechnung</Typography>
          <Typography variant="subtitle2">Wird neu berechnet</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
