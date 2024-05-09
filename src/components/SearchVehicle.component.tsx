import React from 'react';
import { useStoreContext } from '@/context';
import { BaseVehicle } from '@/types';
import { Box, Typography, alpha, useTheme, Autocomplete, TextField } from '@mui/material';
import { PanthorService } from '@/services';
import i18next from 'i18next';

export type TSearchVehicleProps = {
  onChange: (value: BaseVehicle | null) => void;
};

export const SearchVehicle: React.FC<TSearchVehicleProps> = ({ onChange }) => {
  const theme = useTheme();
  const { loading: isLoading, setLoading, vehicleList, setVehicleList } = useStoreContext();
  const [value, setValue] = React.useState<BaseVehicle | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const list = await PanthorService.getVehicleList();
    setVehicleList(list);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => onChange(value), [value]);

  return (
    <Autocomplete
      options={vehicleList}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      filterOptions={(options, state) => {
        const keyword = state.inputValue.toLowerCase();
        const matches = options.filter(
          (option) => option.name.toLowerCase().includes(keyword) || option.classname.toLowerCase().includes(keyword)
        );
        return matches;
      }}
      loading={isLoading}
      loadingText={i18next.t('search_vehicle_loading_text')}
      renderInput={(params) => <TextField label={i18next.t('search_vehicle_label')} {...params} />}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          key={option.id}
          style={{
            borderRadius: `${theme.shape.borderRadius}px`,
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5),
            backgroundColor: selected ? alpha(theme.palette.primary.main, 0.2) : undefined,
            ...props.style,
          }}
        >
          <Box>
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.getVehicleTypeLabel()} - {option.v_space} {i18next.t('market_farming_label_kg')}
            </Typography>
          </Box>
        </li>
      )}
    />
  );
};
