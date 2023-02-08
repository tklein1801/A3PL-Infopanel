import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Linkify } from 'components/base/';

export interface LabelValueProps {
  label: string;
  value: string | React.ReactNode | JSX.Element;
  withDivider?: boolean;
}

export const LabelValue: React.FC<LabelValueProps> = ({ label, value, withDivider = false }) => {
  return (
    <React.Fragment>
      {withDivider ? <Divider /> : null}
      <Box sx={{ my: 0.5 }}>
        <Typography variant="subtitle2" fontWeight="500">
          {label}
        </Typography>
        {typeof value === 'string' ? <Linkify>{value}</Linkify> : value}
      </Box>
    </React.Fragment>
  );
};
