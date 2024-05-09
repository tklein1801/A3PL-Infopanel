import React from 'react';
import { BaseVehicle, MarketItem } from '@/types';
import {
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SearchVehicle } from './SearchVehicle.component';
import { SelectMarketItem } from './SelectMarketItem.component';
import { parseCurrency } from '@/utils';
import i18next from '@/i18next';

export const FarmingCalculator = () => {
  const [form, setForm] = React.useState({
    selectedServer: 1,
    playerInvSpace: 60,
    vehicle: null as BaseVehicle | null,
    marketItem: null as MarketItem | null,
  });

  const totalCapInKg: number = React.useMemo(
    () => (!isNaN(form.playerInvSpace) ? form.playerInvSpace : 0) + (form.vehicle ? form.vehicle.v_space : 0),
    [form]
  );

  const totalItemCount: number = React.useMemo(
    () => Math.floor(totalCapInKg / (form.marketItem ? form.marketItem.getRawWeight() : 0)),
    [totalCapInKg, form]
  );

  return (
    <Paper>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="h6">{i18next.t('market_farming_title')}</Typography>
        <FormControl fullWidth>
          <InputLabel id="select-server-label">{i18next.t('market_farming_label_server')}</InputLabel>
          <Select
            id="select-server"
            labelId="select-server-label"
            label={i18next.t('market_farming_label_server')}
            value={form.selectedServer}
            onChange={(event) => setForm((prev) => ({ ...prev, selectedServer: event.target.value as number }))}
            MenuProps={{ disableScrollLock: true }}
          >
            {[{ id: 1, name: 'Server 1' }].map((server) => (
              <MenuItem key={server.id} value={server.id}>
                {server.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-number"
          label={i18next.t('market_farming_label_inventory')}
          type="number"
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
          value={form.playerInvSpace}
          onChange={(event) => setForm((prev) => ({ ...prev, playerInvSpace: parseInt(event.target.value) }))}
          InputProps={{
            endAdornment: <InputAdornment position="end">{i18next.t('market_farming_label_kg')}</InputAdornment>,
          }}
        />

        <SearchVehicle onChange={(vehicle) => setForm((prev) => ({ ...prev, vehicle }))} />

        <SelectMarketItem onChange={(item) => setForm((prev) => ({ ...prev, marketItem: item }))} />
      </Stack>
      <Divider />

      <List>
        {!isNaN(form.playerInvSpace) && (
          <ListItem
            sx={{ py: 0 }}
            secondaryAction={
              <Typography>
                {form.playerInvSpace} {i18next.t('market_farming_label_kg')}
              </Typography>
            }
          >
            <ListItemText>{i18next.t('market_farming_label_inventory')}</ListItemText>
          </ListItem>
        )}
        {form.vehicle && (
          <ListItem
            sx={{ py: 0 }}
            secondaryAction={
              <Typography>
                {form.vehicle.v_space} {i18next.t('market_farming_label_kg')}
              </Typography>
            }
          >
            <ListItemText>{i18next.t('market_farming_label_vehicle_weight')}</ListItemText>
          </ListItem>
        )}
        <ListItem
          sx={{ py: 0 }}
          secondaryAction={
            <Typography fontWeight={'bolder'}>
              {totalCapInKg} {i18next.t('market_farming_label_kg')}
            </Typography>
          }
        >
          <ListItemText primaryTypographyProps={{ fontWeight: 'bolder' }}>
            {i18next.t('market_farming_label_total_weight')}
          </ListItemText>
        </ListItem>

        {form.marketItem && (
          <React.Fragment>
            <ListItem
              sx={{ py: 0 }}
              secondaryAction={
                <Typography>
                  {form.marketItem.getRawWeight()} {i18next.t('market_farming_label_kg')}
                </Typography>
              }
            >
              <ListItemText
                secondary={`Verarbeitet: ${form.marketItem?.getProcessedWeight()} ${i18next.t(
                  'market_farming_label_kg'
                )}`}
              >
                {i18next.t('market_farming_label_item_weight_raw')}
              </ListItemText>
            </ListItem>
            {totalItemCount && (
              <ListItem
                sx={{ py: 0 }}
                secondaryAction={
                  <Typography>
                    {totalItemCount} {i18next.t('market_farming_label_pcs')}
                  </Typography>
                }
              >
                <ListItemText secondary={`Stückpreis: ${parseCurrency(form.marketItem.price)}`}>
                  {i18next.t('market_farming_label_item_count')}
                </ListItemText>
              </ListItem>
            )}
            <ListItem
              sx={{ py: 0 }}
              secondaryAction={
                <Typography fontWeight={'bolder'}>{parseCurrency(totalItemCount * form.marketItem.price)}</Typography>
              }
            >
              <ListItemText primaryTypographyProps={{ fontWeight: 'bolder' }}>
                {i18next.t('market_farming_label_total')}
              </ListItemText>
            </ListItem>
          </React.Fragment>
        )}
      </List>
    </Paper>
  );
};
