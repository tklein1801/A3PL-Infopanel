import { DATA_REFRESH_INTERVAL } from '@/constants';
import React from 'react';
import { PanthorService } from '@/services';
import {
  BaseVehicle,
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
} from '@/types';
import { CompanyShop } from '@/types/company_shop';

export interface IStoreContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<IStoreContext['loading']>>;
  authentificated: boolean;
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
  companyShops: CompanyShop[];
  setCompanyShops: React.Dispatch<React.SetStateAction<IStoreContext['companyShops']>>;
  vehicleList: BaseVehicle[];
  setVehicleList: React.Dispatch<React.SetStateAction<IStoreContext['vehicleList']>>;
}

export const StoreContext = React.createContext({} as IStoreContext);

export function useStoreContext() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStoreContext must be used inside StoreProvider');
  }
  return ctx;
}

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState<IStoreContext['loading']>(false);
  const [apiKey, setApiKey] = React.useState<IStoreContext['apiKey']>(localStorage.getItem('infopanel.apikey'));
  const [profile, setProfile] = React.useState<IStoreContext['profile']>(null);
  const [changelogs, setChangelogs] = React.useState<IStoreContext['changelogs']>([]);
  const [vehicles, setVehicles] = React.useState<IStoreContext['vehicles']>([]);
  const [servers, setServers] = React.useState<IStoreContext['servers']>([]);
  const [selectedServer, setSelectedServer] = React.useState<IStoreContext['selectedServer']>(null);
  const [marketItems, setMarketItems] = React.useState<IStoreContext['marketItems']>([]);
  const [companyShops, setCompanyShops] = React.useState<IStoreContext['companyShops']>([]);
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
  const [vehicleList, setVehicleList] = React.useState<IStoreContext['vehicleList']>([]);

  const authentificated = React.useMemo(() => {
    return apiKey !== null && apiKey.length > 1;
  }, [apiKey, profile]);

  const fetchProfileData = () => {
    if (!apiKey) return;
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
  };

  React.useEffect(() => {
    setLoading(true);
    if (!apiKey) {
      setProfile(null);
      return setLoading(false);
    }

    fetchProfileData();
    const interval = setInterval(() => {
      fetchProfileData();
    }, DATA_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [apiKey]);

  return (
    <StoreContext.Provider
      value={React.useMemo(
        () => ({
          loading,
          setLoading,
          authentificated: authentificated,
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
          companyShops,
          setCompanyShops,
          vehicleList,
          setVehicleList,
        }),
        [
          loading,
          authentificated,
          apiKey,
          profile,
          changelogs,
          vehicles,
          servers,
          selectedServer,
          marketItems,
          traders,
          cachedTraderOffers,
          companyShops,
          vehicleList,
        ]
      )}
    >
      {children}
    </StoreContext.Provider>
  );
};
