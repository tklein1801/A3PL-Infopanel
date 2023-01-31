import {
  AccountCircle as AccountCircleIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { Phonebook as PhonebookModel } from '../types/phonebook';
import { Profile } from '../types/profile';
import { AccordionSummary } from './base/accordion-summary.component';
import { SearchInput, onSearchHandler } from './base/search.component';
import { Signature } from './base/signature.component';
import { LabelValue } from './core/label-value.component';
import { NoItems } from './core/no-items.component';

export interface PhonebookProps {
  phonebook: PhonebookModel;
}

export const Phonebook: React.FC<PhonebookProps> = ({ phonebook }) => {
  const [keyword, setKeyword] = React.useState('');
  const shownContacts = React.useMemo(() => {
    if (keyword.length < 1) return phonebook.phonebook;
    return phonebook.phonebook.filter((pb) =>
      pb.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, phonebook.phonebook]);

  const handleOnSearch: onSearchHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ mx: 2 }}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar sx={{ width: '80%', height: 'auto', aspectRatio: '1/1', m: 'auto' }}>
              {phonebook.identity.name.split(' ').map((word) => word.charAt(0))}
            </Avatar>
          </Grid>

          <Grid item xs={5}>
            <LabelValue label="Name" value={phonebook.identity.name} />
            <LabelValue label="Nationalität" value={phonebook.identity.id_nationality} />
          </Grid>

          <Grid item xs={5}>
            <LabelValue label="Geburts" value={phonebook.identity.id_birthday.toString()} />
            <LabelValue
              label="Fraktion"
              value={<Chip label={phonebook.identity.side.getLabel()} />}
            />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <LabelValue
              label="Signatur"
              value={phonebook.identity.pid + '-' + phonebook.identity.id}
            />
            <Signature sx={{ fontSize: '1.4rem', mt: '-1rem', mb: '1rem' }}>
              {phonebook.identity.name}
            </Signature>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ ml: 1, mr: 2 }}>
        <SearchInput placeholder="Suchen" onChange={handleOnSearch} />
      </Box>

      <List dense>
        {shownContacts.length < 1 ? (
          <ListItem>
            <ListItemText
              primary="Keine Kontakte"
              primaryTypographyProps={{ textAlign: 'center' }}
              secondary={keyword.length > 0 ? `Keine Treffer für '${keyword}'!` : undefined}
              secondaryTypographyProps={{ textAlign: 'center' }}
            />
          </ListItem>
        ) : (
          shownContacts.map((contact, index) => (
            <React.Fragment key={contact.number}>
              {index !== 0 ? <Divider /> : null}
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>{contact.number || 'Keine Nummer'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{contact.iban || 'Keine IBAN'}</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </React.Fragment>
  );
};

export interface PhonebookWrapperProps {
  phonebooks: Profile['phonebooks'];
}

export const PhonebookWrapper: React.FC<PhonebookWrapperProps> = ({ phonebooks }) => {
  const [shown, setShown] = React.useState(-1);

  const handleChange =
    (version: typeof shown) => (event: React.SyntheticEvent, isClosed: boolean) => {
      setShown(isClosed ? version : -1);
    };

  return (
    <React.Fragment>
      {phonebooks.length > 0 ? (
        phonebooks.map((phonebook) => (
          <Accordion
            key={`${phonebook.identity.id}-phonebook`}
            expanded={phonebook.identity.id === shown}
            onChange={handleChange(phonebook.identity.id)}
          >
            <AccordionSummary
              expanded={phonebook.identity.id === shown}
              expandIcon={<ExpandMoreIcon />}
              id={`panel${phonebook.identity.id}a-header`}
            >
              <Typography>{phonebook.identity.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, pt: 2 }}>
              <Phonebook phonebook={phonebook} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <NoItems message="Keine Kontakte gefunden" />
      )}
    </React.Fragment>
  );
};
