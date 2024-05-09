import React from 'react';
import { useStoreContext } from '@/context';
import { Autocomplete, Stack, TextField, Typography, alpha, useTheme } from '@mui/material';
import { MarketItem } from '@/types';
import { Image } from './base';
import { parseCurrency } from '@/utils';
import i18next from 'i18next';

export type TSelectMarketItemProps = {
  onChange: (value: MarketItem | null) => void;
};

export const SelectMarketItem: React.FC<TSelectMarketItemProps> = ({ onChange }) => {
  const theme = useTheme();
  const { loading: isLoading, marketItems } = useStoreContext();
  const [value, setValue] = React.useState<MarketItem | null>(null);

  React.useEffect(() => onChange(value), [value]);

  return (
    <Autocomplete
      options={marketItems}
      getOptionLabel={(option) => option.localized}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      loading={isLoading}
      loadingText={i18next.t('select_market_item_loading_text')}
      renderInput={(params) => <TextField label={i18next.t('select_market_item_label')} {...params} />}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          key={option.item}
          style={{
            borderRadius: `${theme.shape.borderRadius}px`,
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5),
            backgroundColor: selected ? alpha(theme.palette.primary.main, 0.2) : undefined,
            ...props.style,
          }}
        >
          <Stack flexDirection={'row'}>
            <Image
              alt={`Image of ${option.item}`}
              src={option.getImageUrl()}
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                marginRight: theme.spacing(1),
              }}
            />
            <Stack>
              <Typography variant="body1">{option.localized}</Typography>
              <Typography variant="body2" color="text.secondary">
                {i18next.t('select_market_item_label_raw')}: {option.getRawWeight()}{' '}
                {i18next.t('market_farming_label_kg')} - {i18next.t('select_market_item_label_processed')}:{' '}
                {option.getProcessedWeight()} {i18next.t('market_farming_label_kg')} - {parseCurrency(option.price)}
              </Typography>
            </Stack>
          </Stack>
        </li>
      )}
    />
  );
};
