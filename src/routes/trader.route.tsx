import { Grid, Typography } from '@mui/material';
import React from 'react';
import { PanthorService } from '@/services';
import { ShopCategory, ShopType } from '@/types';
import { StoreContext } from '@/context';
import { NoItems, Progress, TraderWrapper } from '@/components';
import i18next from '@/i18next';

export const Trader = () => {
  const { loading, setLoading, traders, setTraders } = React.useContext(StoreContext);

  const handlePromiseResult = (result: PromiseSettledResult<ShopType[]>) => {
    if (result.status === 'rejected') return;
    if (result.value.length < 1) return;
    setTraders((prev) => ({ ...prev, [result.value[0].category]: result.value }));
  };

  React.useEffect(() => {
    setLoading(true);
    Promise.allSettled(
      [
        { category: 'items' as ShopCategory, promise: PanthorService.getShopTypes('items') },
        { category: 'vehicles' as ShopCategory, promise: PanthorService.getShopTypes('vehicles') },
      ]
        .filter((promise) => traders[promise.category].length < 1)
        .map((promise) => promise.promise)
    )
      .then((promiseResults) => promiseResults.forEach((result) => handlePromiseResult(result)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" mb={1}>
          {i18next.t('trader_items_heading')} {traders.items.length > 0 && `(${traders.items.length})`}
        </Typography>

        {loading ? (
          <Progress />
        ) : traders.items.length > 0 ? (
          <TraderWrapper category="items" shops={traders.items} sort />
        ) : (
          <NoItems message={i18next.t('trader_no_providers')} />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" mb={1}>
          {i18next.t('trader_vehicles_heading')} {traders.vehicles.length > 0 && `(${traders.vehicles.length})`}
        </Typography>

        {loading ? (
          <Progress />
        ) : traders.vehicles.length > 0 ? (
          <TraderWrapper category="vehicles" shops={traders.vehicles} sort />
        ) : (
          <NoItems message={i18next.t('trader_no_providers')} />
        )}
      </Grid>
    </Grid>
  );
};
