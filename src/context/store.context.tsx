import React from 'react';
import { PanthorService } from 'services/';
import {
  Changelog,
  MarketItem,
  Profile,
  RpgServer,
  Server,
  ShopCar,
  ShopCategory,
  ShopItem,
  ShopType,
  Vehicle,
} from 'types/';

export interface IStoreContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<IStoreContext['loading']>>;
  apiKey: string | null;
  setApiKey: React.Dispatch<React.SetStateAction<IStoreContext['apiKey']>>;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<IStoreContext['profile']>>;
  changelogs: Changelog[];
  setChangelogs: React.Dispatch<React.SetStateAction<IStoreContext['changelogs']>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<IStoreContext['vehicles']>>;
  servers: RpgServer[] | Server[];
  setServers: React.Dispatch<React.SetStateAction<IStoreContext['servers']>>;
  selectedServer: RpgServer | Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<IStoreContext['selectedServer']>>;
  marketItems: MarketItem[];
  setMarketItems: React.Dispatch<React.SetStateAction<IStoreContext['marketItems']>>;
  traders: Record<ShopCategory, ShopType[]>;
  setTraders: React.Dispatch<React.SetStateAction<IStoreContext['traders']>>;
  cachedTraderOffers: Record<ShopCategory, Record<ShopType['type'], ShopItem[] | ShopCar[]>>;
  setCachedTraderOffers: React.Dispatch<React.SetStateAction<IStoreContext['cachedTraderOffers']>>;
}

export const StoreContext = React.createContext({} as IStoreContext);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState<IStoreContext['loading']>(false);
  const [apiKey, setApiKey] = React.useState<IStoreContext['apiKey']>(
    localStorage.getItem('infopanel.apikey')
  );
  const [profile, setProfile] = React.useState<IStoreContext['profile']>(null);
  const [changelogs, setChangelogs] = React.useState<IStoreContext['changelogs']>([]);
  const [vehicles, setVehicles] = React.useState<IStoreContext['vehicles']>([]);
  const [servers, setServers] = React.useState<IStoreContext['servers']>([]);
  const [selectedServer, setSelectedServer] = React.useState<IStoreContext['selectedServer']>(null);
  const [marketItems, setMarketItems] = React.useState<IStoreContext['marketItems']>([]);
  const [traders, setTraders] = React.useState<IStoreContext['traders']>({
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
    PanthorService.getProfile(apiKey)
      .then((data) => {
        if (!data) throw new Error('No profile returned');
        setProfile(data);
        document.title = data.name;
      })
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
