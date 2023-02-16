import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { PanthorService } from 'services/';
import { CopBonus, RpgServer } from 'types/';
import { parseCurrency } from 'utils/';
import { StoreContext } from 'context/';
import {
  CopBonus as CopBonusComponent,
  Image,
  MarketItemRefreshCountdown,
  MarketItemRefreshCountdownProps,
  NoItems,
  Progress,
  SearchInput,
} from 'components/';

export const Market = () => {
  const { loading, setLoading, servers, marketItems, setMarketItems } =
    React.useContext(StoreContext);
  const FALLBACK_SERVER_ID = 1;
  const SERVER = servers.find((server) => server.id === FALLBACK_SERVER_ID) as
    | RpgServer
    | undefined;
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
    return marketItems.filter((item) =>
      item.localized.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [marketItems, keyword]);

  React.useEffect(() => {
    setLoading(true);
    PanthorService.getMarket(SERVER ? SERVER.id : FALLBACK_SERVER_ID)
      .then(async (items) => {
        setMarketItems(items);
        if (items && items.length > 0) {
          const [a, b] = await items[0].getPriceBacklog(SERVER ? SERVER.id : FALLBACK_SERVER_ID, 2);
          setRefreshInterval({
            refresh: a.createdAt,
            interval: differenceInSeconds(a.createdAt, b.createdAt),
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [servers, copsOnline, SERVER, setLoading, setMarketItems]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} order={{ xs: 1, md: 0 }}>
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
              <List dense>
                {shownItems.map((item, index) => (
                  <React.Fragment key={item.item}>
                    {index !== 0 ? <Divider /> : null}
                    <ListItem key={item.item} sx={{ px: 2, py: 1 }}>
                      <ListItemAvatar>
                        <Image
                          alt={`Image of ${item.localized}`}
                          src={item.getImageUrl()}
                          style={{
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={item.localized} />
                      <ListItemText
                        primary={
                          <Tooltip title="Basispreis" placement="bottom-end">
                            <Typography>{parseCurrency(item.price)}</Typography>
                          </Tooltip>
                        }
                        secondary={
                          item.isIllegal()
                            ? parseCurrency(copBonus.calculatePrice(item.price))
                            : undefined
                        }
                        sx={{ textAlign: 'right' }}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <NoItems
                message={
                  keyword.length > 0 ? `Keine Treffer für '${keyword}'` : 'Keine Items gefunden'
                }
              />
            )}
          </Paper>
        )}
      </Grid>

      <Grid container item xs={12} md={6} spacing={2}>
        {/* TODO: Make this sticky to top */}
        <Grid item display={refreshInterval.interval > 0 ? 'unset' : 'none'} xs={12} lg={6}>
          {loading ? (
            <Progress />
          ) : (
            refreshInterval.interval > 0 && (
              <MarketItemRefreshCountdown
                {...refreshInterval}
                onPriceRecalculation={handler.onPriceRecalculation}
              />
            )
          )}
        </Grid>

        <Grid item xs={12} lg={6}>
          {loading ? <Progress /> : <CopBonusComponent copsOnline={copsOnline} />}
        </Grid>
      </Grid>
    </Grid>
  );
};
