import { ExpandMore as ExpandMoreIcon, Room as RoomIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, Box, Button, Chip, Grid, Link, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { House } from 'types';
import { StoreContext } from 'context/';
import { AccordionSummary, NoItems, Progress } from 'components/';

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
      buildings: profile.buildings,
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
              Gebäude {properties.houses.length > 0 && `(${properties.houses.length})`}
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
                    <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>Haus {house.id}</Typography>
                    <Chip
                      label={house instanceof House ? 'Inhaber' : 'Bewohner'}
                      size="small"
                      sx={{ ml: { xs: 0, md: 1 } }}
                    />

                    {house.disabled ? (
                      <Chip label="Inaktiv" size="small" sx={{ ml: 1 }} />
                    ) : (
                      <Chip label={`${house.payed_for / 24} Tage`} size="small" sx={{ ml: 1 }} />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Position
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<RoomIcon />}
                          LinkComponent={Link}
                          href={house.getPosition().getMapUrl()}
                          target="_blank"
                        >
                          Karte aufrufen
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Gewartet bis zum
                        </Typography>
                        <Typography>{format(house.active_until, 'dd.MM.yy, HH:mm')} Uhr</Typography>
                      </Grid>
                      {house instanceof House && house.players.length > 0 && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            Zweitschlüssel
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
              <NoItems message="Keine Häuser gefunden" />
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" mb={1}>
              Appartments {properties.rentals.length > 0 && `(${properties.rentals.length})`}
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
                      <Chip label="Inaktiv" size="small" sx={{ ml: { xs: 0, md: 1 } }} />
                    ) : (
                      <Chip label={`${rental.payed_for / 24} Tage`} size="small" sx={{ ml: { xs: 0, md: 1 } }} />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Gemietet bis zum
                        </Typography>
                        <Typography>{format(rental.active_until, 'dd.MM.yy, HH:mm')} Uhr</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <NoItems message="Keine Appartments gefunden" />
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" mb={1}>
              Baustellen {properties.buildings.length > 0 && `(${properties.buildings.length})`}
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
                    {building.disabled ? (
                      <Chip label="Inaktiv" size="small" sx={{ ml: { xs: 0, md: 1 } }} />
                    ) : (
                      <Chip label={`Baustufe ${building.stage}`} size="small" sx={{ ml: { xs: 0, md: 1 } }} />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Position
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<RoomIcon />}
                          LinkComponent={Link}
                          href={building.location.getMapUrl()}
                          target="_blank"
                        >
                          Karte aufrufen
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Baustufe
                        </Typography>
                        <Typography>
                          {building.stage}, {building.classname}
                        </Typography>
                      </Grid>
                      {building.players.length > 0 && (
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            Zweitschlüssel
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
              <NoItems message="Keine Baustellen gefunden" />
            )}
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
