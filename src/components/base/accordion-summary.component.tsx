import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps as MuiAccordionSummaryProps,
} from '@mui/material';
import React from 'react';

export interface AccordionSummaryProps extends MuiAccordionSummaryProps {
  expanded?: boolean;
}

export const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => {
  return (
    <MuiAccordionSummary
      {...props}
      sx={{
        '.MuiAccordionSummary-content': {
          display: 'flex',
          flexWrap: 'wrap',
        },
        borderBottom: props.expanded ? (theme) => `thin solid ${theme.palette.divider}` : 'none',
        ...props.sx,
      }}
    >
      {props.children}
    </MuiAccordionSummary>
  );
};
