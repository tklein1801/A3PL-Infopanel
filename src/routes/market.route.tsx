import { ExpandMore as ExpandMoreIcon, Storefront as StorefrontIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Badge,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { DATA_REFRESH_INTERVAL } from 'constants/';
import { differenceInSeconds, format } from 'date-fns';
import React from 'react';
import { PanthorService } from 'services/';
import { CopBonus, MarketItem, RpgServer } from 'types/';
import { parseCurrency } from 'utils/';
import { StoreContext } from 'context/';
import {
  AccordionSummary,
  CopBonus as CopBonusComponent,
  Icon,
  Image,
  MarketItemRefreshCountdown,
  MarketItemRefreshCountdownProps,
  NoItems,
  Progress,
  SearchInput,
} from 'components/';
import { MarketItemList } from 'components/MarketItem.component';

export const Market = () => {
  const id = React.useId();
  const { loading, setLoading, servers, marketItems, setMarketItems, companyShops, setCompanyShops } =
    React.useContext(StoreContext);
  const [currentCompanyShop, setCurrentCompanyShop] = React.useState<string>('');
  const FALLBACK_SERVER_ID = 1;
  const SERVER = servers.find((server) => server.id === FALLBACK_SERVER_ID) as RpgServer | undefined;
  const [keyword, setKeyword] = React.useState('');
  const [refreshInterval, setRefreshInterval] = React.useState<MarketItemRefreshCountdownProps>({
    refresh: new Date(),
    interval: 0,
  });

  const handler: {
    onPriceRecalculation: MarketItemRefreshCountdownProps['onPriceRecalculation'];
    onSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  } = {
    onPriceRecalculation() {
      PanthorService.getMarket(SERVER ? SERVER.id : FALLBACK_SERVER_ID)
        .then(setMarketItems)
        .catch(console.error);
    },
    onSearch(event) {
      setKeyword(event.target.value);
    },
  };

  const copsOnline = React.useMemo(() => (SERVER ? SERVER.cops : 0), [SERVER]);

  const copBonus = React.useMemo(() => new CopBonus(copsOnline), [copsOnline]);

  const shownItems = React.useMemo(() => {
    if (keyword.length < 1) return marketItems;
    return marketItems.filter((item) => item.localized.toLowerCase().includes(keyword.toLowerCase()));
  }, [marketItems, keyword]);

  const handleCompanyShopToggle =
    (version: typeof currentCompanyShop) => (event: React.SyntheticEvent, isClosed: boolean) => {
      setCurrentCompanyShop(isClosed ? version : '');
      // if (isClosed) {
      //   searchParams.set('changelog', version);
      // } else searchParams.delete('changelog');
      // navigate({ search: searchParams.toString() });
    };

  const fetchMarketData = () => {
    Promise.all([PanthorService.getMarket(SERVER ? SERVER.id : FALLBACK_SERVER_ID), PanthorService.getCompanyShops()])
      .then(async ([marketItems, getCompanyShops]) => {
        setCompanyShops(getCompanyShops);
        setMarketItems(marketItems);
        if (marketItems && marketItems.length > 0) {
          const [a, b] = await marketItems[0].getPriceBacklog(SERVER ? SERVER.id : FALLBACK_SERVER_ID, 2);
          setRefreshInterval({
            refresh: a.createdAt,
            interval: differenceInSeconds(a.createdAt, b.createdAt),
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    setLoading(true);
    fetchMarketData();
    const interval = setInterval(() => {
      fetchMarketData();
    }, DATA_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [servers, copsOnline, SERVER, setLoading, setMarketItems]);

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} md={6} spacing={2}>
        {/* TODO: Make this sticky to top */}
        <Grid item display={refreshInterval.interval > 0 ? 'unset' : 'none'} xs={12} lg={6}>
          {loading ? (
            <Progress />
          ) : (
            refreshInterval.interval > 0 && (
              <MarketItemRefreshCountdown {...refreshInterval} onPriceRecalculation={handler.onPriceRecalculation} />
            )
          )}
        </Grid>

        <Grid item xs={12} lg={6}>
          {loading ? <Progress /> : <CopBonusComponent copsOnline={copsOnline} />}
        </Grid>

        <Grid item xs={12} lg={12}>
          {loading ? (
            <Progress />
          ) : (
            <Paper>
              <Box
                sx={{
                  zIndex: 200,
                  position: 'sticky',
                  top: (theme) => ({ xs: theme.spacing(6), md: theme.spacing(8) }),
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: 'inherit',
                  borderRadius: 'inherit',
                  backgroundImage: 'inherit',
                }}
              >
                <Typography variant="subtitle1">Marktpreise</Typography>
                <Box sx={{ ml: 2 }}>
                  <SearchInput placeholder="Suchen" onChange={handler.onSearch} />
                </Box>
              </Box>

              {shownItems.length > 0 ? (
                <MarketItemList
                  items={shownItems.map((item, index) => ({
                    className: item.item,
                    icon: item.getImageUrl(),
                    name: item.localized,
                    price1: item.price,
                    price2: item.isIllegal() ? copBonus.calculatePrice(item.price) : undefined,
                    withDivider: index !== 0,
                  }))}
                />
              ) : (
                <NoItems message={keyword.length > 0 ? `Keine Treffer für '${keyword}'` : 'Keine Items gefunden'} />
              )}
            </Paper>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        {loading ? (
          <Progress />
        ) : companyShops.length > 0 ? (
          companyShops.map((shop) => {
            const uniqueAccordionId = shop.industrialAreaId.toString();
            const expanded = currentCompanyShop === uniqueAccordionId;
            return (
              <Accordion
                key={`${id}-company-shop-${uniqueAccordionId}`}
                expanded={expanded}
                onChange={handleCompanyShopToggle(uniqueAccordionId)}
              >
                <AccordionSummary
                  expanded={expanded}
                  expandIcon={<ExpandMoreIcon />}
                  id={`panel${uniqueAccordionId}a-header`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge color="primary" badgeContent={shop.offers.length}>
                      <Icon icon={<StorefrontIcon />} />
                    </Badge>
                    <Box sx={{ ml: 2 }}>
                      <Typography sx={{ width: { xs: '100%', md: 'unset' } }}>{shop.company.name}</Typography>
                      <Typography variant="body2">Inhaber/in {shop.company.owner}</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: shop.offers.length > 0 ? 0 : 2 }}>
                  {shop.offers.length > 0 ? (
                    <MarketItemList
                      items={shop.offers.map((item, index) => ({
                        className: item.className,
                        icon: MarketItem.getImageUrl(item.className),
                        name: item.name,
                        price1: item.price,
                        price2: item.amount + ' Stück',
                        withDivider: index !== 0,
                      }))}
                    />
                  ) : (
                    <NoItems message="Keine Angebote gefunden" />
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <NoItems message="Keine Firmen gefunden" />
        )}
      </Grid>
    </Grid>
  );
};
