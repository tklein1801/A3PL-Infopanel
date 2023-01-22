import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  alpha,
  lighten,
} from '@mui/material';
import type { AccordionProps } from '@mui/material';
import React from 'react';
import { AccordionSummary } from '../components/base/accordion-summary.component';
import { Progress } from '../components/progress.component';
import { StoreContext } from '../context/store.context';
import { ReallifeService } from '../services/reallife.service';
import { theme } from '../theme/default.theme';
import type { ShopCarResponse, ShopCategory } from '../types/shop';
import { ShopCar, ShopItem, ShopType } from '../types/shop';
import { parseCurrency } from '../utils/parseCurrency.util';

export interface TraderProps {
  expanded?: AccordionProps['expanded'];
  onChange?: (event: React.SyntheticEvent, isClosed: boolean, object: ShopType['type']) => void;
  trader: ShopType;
  isCached: boolean;
  cachedOffers?: ShopItem[] | ShopCar[];
  loadingOffersIntoCache?: (offers: ShopItem[] | ShopCar[]) => void;
}

export const Trader: React.FC<TraderProps> = ({
  expanded,
  onChange,
  trader,
  isCached,
  cachedOffers,
  loadingOffersIntoCache,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [offers, setOffers] = React.useState<ShopItem[] | ShopCar[]>([]);

  const handleReceivedOffers = (offers: ShopItem[] | ShopCar[]) => {
    setOffers(offers);
    if (loadingOffersIntoCache) loadingOffersIntoCache(offers);
  };

  React.useEffect(() => {
    if (
      (expanded && !isCached) ||
      (expanded && isCached && (!cachedOffers || cachedOffers.length < 1))
    ) {
      console.log('requesting data');
      setLoading(true);
      trader
        .getOffers()
        .then(handleReceivedOffers)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else setOffers(cachedOffers || []);
  }, [expanded, isCached]);

  return (
    <Accordion
      expanded={expanded}
      onChange={(event, isClosed) => {
        if (onChange) onChange(event, isClosed, trader.type);
      }}
    >
      <AccordionSummary
        id={`${trader.type}-header`}
        expanded={expanded}
        expandIcon={<ExpandMoreIcon />}
        sx={{
          zIndex: 1,
          position: 'sticky',
          top: (theme) => ({ xs: theme.spacing(6), md: theme.spacing(8) }),
          backgroundColor: (theme) => (expanded ? theme.palette.background.paper : 'unset'),
          backgroundImage: expanded
            ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
            : 'none',
          borderRadius: 'inherit',
        }}
      >
        <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>{trader.name}</Typography>
        {isCached && <Chip label="Cached" size="small" sx={{ ml: { xs: 0, md: 1 } }} />}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense>
            {offers.map((offer, index) => (
              <React.Fragment key={offer.id}>
                {index !== 0 ? <Divider /> : null}
                <ListItem
                  key={offer.id}
                  secondaryAction={<Typography>{parseCurrency(offer.price)}</Typography>}
                >
                  <ListItemText primary={offer.name} secondary={`Level ${offer.level}`} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export interface TraderWrapperProps {
  category: ShopCategory;
  shops: ShopType[];
}

export const TraderWrapper: React.FC<TraderWrapperProps> = ({ category, shops }) => {
  const { cachedTraderOffers, setCachedTraderOffers } = React.useContext(StoreContext);
  const [shown, setShown] = React.useState<ShopType['type']>('');

  const handleChange = (
    event: React.SyntheticEvent,
    isClosed: boolean,
    object: ShopType['type']
  ) => {
    setShown(isClosed ? object : '');
  };

  const areOffersCached = (shop: ShopType['type']) => shop in cachedTraderOffers[category];

  const getCachedTraderOffers = (category: ShopCategory, shopType: ShopType['type']) => {
    return cachedTraderOffers[category][shopType];
  };

  const handleUpdateCache = (
    category: ShopCategory,
    shop: ShopType['type'],
    offers: ShopItem[] | ShopCar[]
  ) => {
    setCachedTraderOffers((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [shop]: offers,
      },
    }));
  };

  return (
    <React.Fragment>
      {shops.length > 0 ? (
        shops.map((shop) => (
          <Trader
            key={shop.type}
            expanded={shown === shop.type}
            trader={shop}
            onChange={handleChange}
            isCached={areOffersCached(shop.type)}
            cachedOffers={getCachedTraderOffers(category, shop.type)}
            loadingOffersIntoCache={(offers) => handleUpdateCache(category, shop.type, offers)}
          />
        ))
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography textAlign="center">Keine Shops gefunden</Typography>
        </Paper>
      )}
    </React.Fragment>
  );
};
