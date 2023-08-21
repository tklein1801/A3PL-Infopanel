import { Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { parseCurrency } from '@/utils';
import { Image } from './base';

export type MarketItemProps = {
  icon: string;
  name: string;
  className: string;
  price1: string | number;
  price2?: string | number;
  withDivider?: boolean;
};

export const MarketItem: React.FC<MarketItemProps> = ({
  icon,
  name,
  className,
  price1,
  price2,
  withDivider = false,
}) => {
  return (
    <React.Fragment>
      {withDivider ? <Divider /> : null}
      <ListItem key={className} sx={{ px: 2, py: 1 }}>
        <ListItemAvatar>
          <Image
            alt={`Image of ${name}`}
            src={icon}
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}
          />
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemText
          primary={
            <Tooltip title="Basispreis" placement="bottom-end">
              <Typography>{typeof price1 === 'number' ? parseCurrency(price1) : price1}</Typography>
            </Tooltip>
          }
          secondary={price2 && typeof price2 === 'number' ? parseCurrency(price2) : price2}
          sx={{ textAlign: 'right' }}
        />
      </ListItem>
    </React.Fragment>
  );
};

export type MarketItemListProps = {
  items: MarketItemProps[];
};

export const MarketItemList: React.FC<MarketItemListProps> = ({ items }) => {
  const id = React.useId();
  return (
    <List dense>
      {items.map((item) => (
        <MarketItem key={id + 'market-list' + item.className} {...item} />
      ))}
    </List>
  );
};
