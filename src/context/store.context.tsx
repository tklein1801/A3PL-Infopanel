import React from 'react';
import { ReallifeService } from '../services/reallife.service';
import { Changelog } from '../types/changelog';
import { Vehicle } from '../types/garage';
import { MarketItem } from '../types/market';
import { Profile } from '../types/profile';
import { RpgServer, Server } from '../types/server';
import { ShopCar, ShopCategory, ShopItem, ShopType } from '../types/shop';

export interface StoreContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<StoreContext['loading']>>;
  apiKey: string | null;
  setApiKey: React.Dispatch<React.SetStateAction<StoreContext['apiKey']>>;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<StoreContext['profile']>>;
  changelogs: Changelog[];
  setChangelogs: React.Dispatch<React.SetStateAction<StoreContext['changelogs']>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<StoreContext['vehicles']>>;
  servers: RpgServer[] | Server[];
  setServers: React.Dispatch<React.SetStateAction<StoreContext['servers']>>;
  selectedServer: RpgServer | Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<StoreContext['selectedServer']>>;
  marketItems: MarketItem[];
  setMarketItems: React.Dispatch<React.SetStateAction<StoreContext['marketItems']>>;
  traders: Record<ShopCategory, ShopType[]>;
  setTraders: React.Dispatch<React.SetStateAction<StoreContext['traders']>>;
  cachedTraderOffers: Record<ShopCategory, Record<ShopType['type'], ShopItem[] | ShopCar[]>>;
  setCachedTraderOffers: React.Dispatch<React.SetStateAction<StoreContext['cachedTraderOffers']>>;
}

export const StoreContext = React.createContext({} as StoreContext);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState<StoreContext['loading']>(false);
  const [apiKey, setApiKey] = React.useState<StoreContext['apiKey']>(
    localStorage.getItem('infopanel.apikey')
  );
  const [profile, setProfile] = React.useState<StoreContext['profile']>(null);
  const [changelogs, setChangelogs] = React.useState<StoreContext['changelogs']>([]);
  const [vehicles, setVehicles] = React.useState<StoreContext['vehicles']>([]);
  const [servers, setServers] = React.useState<StoreContext['servers']>([]);
  const [selectedServer, setSelectedServer] = React.useState<StoreContext['selectedServer']>(null);
  const [marketItems, setMarketItems] = React.useState<StoreContext['marketItems']>([]);
  const [traders, setTraders] = React.useState<StoreContext['traders']>({
    items: [],
    vehicles: [],
  });
  const [cachedTraderOffers, setCachedTraderOffers] = React.useState<
    Record<ShopCategory, Record<ShopType['type'], ShopItem[] | ShopCar[]>>
  >({
    items: {},
    vehicles: {},
  });

  React.useEffect(() => {
    setLoading(true);
    if (!apiKey) {
      setProfile(null);
      return setLoading(false);
    }
    ReallifeService.getProfile(apiKey)
      .then(setProfile)
      .catch((error) => {
        console.error(error);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [apiKey]);

  return (
    <StoreContext.Provider
      value={React.useMemo(
        () => ({
          loading,
          setLoading,
          apiKey,
          setApiKey,
          profile,
          setProfile,
          changelogs,
          setChangelogs,
          vehicles,
          setVehicles,
          servers,
          setServers,
          selectedServer,
          setSelectedServer,
          marketItems,
          setMarketItems,
          traders,
          setTraders,
          cachedTraderOffers,
          setCachedTraderOffers,
        }),
        [
          loading,
          apiKey,
          profile,
          changelogs,
          vehicles,
          servers,
          selectedServer,
          marketItems,
          traders,
          cachedTraderOffers,
        ]
      )}
    >
      {children}
    </StoreContext.Provider>
  );
};
