import { AccountCircle as AccountCircleIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
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
import { Phonebook as PhonebookModel, Profile } from '@/types';
import { AccordionSummary, SearchInput, Signature, onSearchHandler } from './base/';
import { LabelValue, NoItems } from './core/';
import i18next from '@/i18next';

export interface PhonebookProps {
  phonebook: PhonebookModel;
}

export const Phonebook: React.FC<PhonebookProps> = ({ phonebook }) => {
  const [keyword, setKeyword] = React.useState('');
  const shownContacts = React.useMemo(() => {
    if (keyword.length < 1) return phonebook.phonebook;
    return phonebook.phonebook.filter((pb) => pb.name.toLowerCase().includes(keyword.toLowerCase()));
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
            <LabelValue label={i18next.t('phonebook_name')} value={phonebook.identity.name} />
            <LabelValue label={i18next.t('phonebook_nation')} value={phonebook.identity.id_nationality} />
          </Grid>

          <Grid item xs={5}>
            <LabelValue label={i18next.t('phonebook_dob')} value={phonebook.identity.id_birthday.toString()} />
            <LabelValue
              label={i18next.t('phonebook_side')}
              value={<Chip label={phonebook.identity.side.getLabel()} />}
            />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <LabelValue
              label={i18next.t('phonebook_signature')}
              value={phonebook.identity.pid + '-' + phonebook.identity.id}
            />
            <Signature sx={{ fontSize: '1.4rem', mt: '-1rem', mb: '1rem' }}>{phonebook.identity.name}</Signature>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ ml: 1, mr: 2 }}>
        <SearchInput placeholder={i18next.t('phonebook_search')} onChange={handleOnSearch} />
      </Box>

      <List dense>
        {shownContacts.length < 1 ? (
          <ListItem>
            <ListItemText
              primary={i18next.t('phonebook_no_contacts')}
              primaryTypographyProps={{ textAlign: 'center' }}
              secondary={keyword.length > 0 ? i18next.t('phonebook_no_matches_for', { keyword: keyword }) : undefined}
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
                        <Typography>{contact.number || i18next.t('phonebook_contact_no_phone')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{contact.iban || i18next.t('phonebook_contact_no_iban')}</Typography>
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

  const handleChange = (version: typeof shown) => (_event: React.SyntheticEvent, isClosed: boolean) => {
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
        <NoItems message={i18next.t('phonebook_no_contacts')} />
      )}
    </React.Fragment>
  );
};
