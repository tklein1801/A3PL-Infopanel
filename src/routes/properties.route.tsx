import { ExpandMore as ExpandMoreIcon, Room as RoomIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, Box, Button, Chip, Grid, Link, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { House, Building } from '@/types';
import { StoreContext } from '@/context';
import { AccordionSummary, NoItems, Progress } from '@/components';
import i18next from '@/i18next';

export const Properties = () => {
  const id = React.useId();
  const { loading, profile } = React.useContext(StoreContext);
  const [open, setOpen] = React.useState<number | null>(null);

  const handleChange = (accordion: typeof open) => (event: React.SyntheticEvent, isClosed: boolean) => {
    setOpen(isClosed ? accordion : null);
  };

  const properties = React.useMemo(() => {
    if (!profile) {
      return {
        houses: [],
        rentals: [],
        buildings: [],
      };
    }

    return {
      houses: profile.getHouses(),
      rentals: profile.rentals,
      buildings: profile.getBuildings(),
    };
  }, [profile]);

  return (
    <React.Fragment>
      {loading ? (
        <Progress />
      ) : (
        <React.Fragment>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              {i18next.t('properties_house_heading')} {properties.houses.length > 0 && `(${properties.houses.length})`}
            </Typography>
            {properties.houses.length > 0 ? (
              properties.houses.map((house) => (
                <Accordion
                  key={`${id}-house-${house.id}`}
                  expanded={open === house.id}
                  onChange={handleChange(house.id)}
                >
                  <AccordionSummary
                    expanded={open === house.id}
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${house.id}a-header`}
                  >
                    <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>
                      {i18next.t('properties_house_house')} {house.id}
                    </Typography>
                    <Chip
                      label={
                        house instanceof House
                          ? i18next.t('properties_house_owner')
                          : i18next.t('properties_house_roommate')
                      }
                      size="small"
                      sx={{ ml: { xs: 0, md: 1 } }}
                    />

                    {house.disabled ? (
                      <Chip label={i18next.t('properties_house_inactive')} size="small" sx={{ ml: 1 }} />
                    ) : (
                      <Chip
                        label={`${house.payed_for / 24} ${i18next.t('properties_house_active_days')}`}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {i18next.t('properties_house_position')}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<RoomIcon />}
                          LinkComponent={Link}
                          href={house.getPosition().getMapUrl()}
                          target="_blank"
                        >
                          {i18next.t('properties_house_position_button')}
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {i18next.t('properties_paid_till')}
                        </Typography>
                        <Typography>
                          {format(house.active_until, 'dd.MM.yy, HH:mm')} {i18next.t('properties_paid_till_hour')}
                        </Typography>
                      </Grid>
                      {house instanceof House && house.players.length > 0 && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            {i18next.t('properties_house_roommates')}
                          </Typography>
                          {house.players.map((player) => (
                            <Chip key={player} label={player} sx={{ mr: 1, mb: 1 }} />
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <NoItems message={i18next.t('properties_house_no_houses')} />
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" mb={1}>
              {i18next.t('properties_appartment_heading')}{' '}
              {properties.rentals.length > 0 && `(${properties.rentals.length})`}
            </Typography>
            {properties.rentals.length > 0 ? (
              properties.rentals.map((rental) => (
                <Accordion
                  key={`${id}-rental-${rental.id}`}
                  expanded={open === rental.id}
                  onChange={handleChange(rental.id)}
                >
                  <AccordionSummary
                    expanded={open === rental.id}
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${rental.id}a-header`}
                  >
                    <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>Appartment {rental.id}</Typography>
                    {rental.disabled ? (
                      <Chip label={i18next.t('properties_house_inactive')} size="small" sx={{ ml: { xs: 0, md: 1 } }} />
                    ) : (
                      <Chip
                        label={`${rental.payed_for / 24} ${i18next.t('properties_house_active_days')}`}
                        size="small"
                        sx={{ ml: { xs: 0, md: 1 } }}
                      />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {i18next.t('properties_appartment_rented_till')}
                        </Typography>
                        <Typography>
                          {format(rental.active_until, 'dd.MM.yy, HH:mm')}{' '}
                          {i18next.t('properties_house_paid_till_hour')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <NoItems message={i18next.t('properties_appartment_no_appartments')} />
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" mb={1}>
              {i18next.t('properties_building_heading')}{' '}
              {properties.buildings.length > 0 && `(${properties.buildings.length})`}
            </Typography>
            {properties.buildings.length > 0 ? (
              properties.buildings.map((building) => (
                <Accordion
                  key={`${id}-building-${building.id}`}
                  expanded={open === building.id}
                  onChange={handleChange(building.id)}
                >
                  <AccordionSummary
                    expanded={open === building.id}
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${building.id}a-header`}
                  >
                    <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>Baustelle {building.id}</Typography>
                    <Chip
                      label={
                        building instanceof Building
                          ? i18next.t('properties_house_owner')
                          : i18next.t('properties_building_contractor')
                      }
                      size="small"
                      sx={{ ml: { xs: 0, md: 1 } }}
                    />
                    {building.disabled ? (
                      <Chip label={i18next.t('properties_house_inactive')} size="small" sx={{ ml: 1 }} />
                    ) : (
                      <Chip
                        label={i18next.t('properties_building_stage', { stage: building.stage })}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {i18next.t('properties_house_position')}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<RoomIcon />}
                          LinkComponent={Link}
                          href={building.getPosition().getMapUrl()}
                          target="_blank"
                        >
                          {i18next.t('properties_house_position_button')}
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {i18next.t('properties_building_stage', { stage: '' })}
                        </Typography>
                        <Typography>
                          {building.stage}, {building.classname}
                        </Typography>
                      </Grid>
                      {building instanceof Building && building.players.length > 0 && (
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            {i18next.t('properties_building_contractor')}
                          </Typography>
                          {building.players.map((player) => (
                            <Chip key={player} label={player} sx={{ mr: 1, mb: 1 }} />
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <NoItems message={i18next.t('properties_building_no_buildings')} />
            )}
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
