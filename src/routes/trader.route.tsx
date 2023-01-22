import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Progress } from '../components/progress.component';
import { TraderWrapper } from '../components/trader.component';
import { StoreContext } from '../context/store.context';
import { ReallifeService } from '../services/reallife.service';
import { ShopCategory, ShopType } from '../types/shop';

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
        { category: 'items' as ShopCategory, promise: ReallifeService.getShopTypes('items') },
        { category: 'vehicles' as ShopCategory, promise: ReallifeService.getShopTypes('vehicles') },
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
          Gegenstände ({traders.items.length})
        </Typography>

        {loading ? <Progress /> : <TraderWrapper category="items" shops={traders.items} />}
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" mb={1}>
          Fahrzeuge ({traders.vehicles.length})
        </Typography>

        {loading ? <Progress /> : <TraderWrapper category="vehicles" shops={traders.vehicles} />}
      </Grid>
    </Grid>
  );
};
