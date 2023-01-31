import type { ApiResponse, ErrorResponse, ValidSecretResponse } from '../types/api_response';
import type { ChangelogResponse } from '../types/changelog';
import { Changelog } from '../types/changelog';
import type { VehicleResponse } from '../types/garage';
import { Vehicle } from '../types/garage';
import type { MarketItemResponse } from '../types/market';
import { MarketItem } from '../types/market';
import type { ProfileResponse } from '../types/profile';
import { Profile } from '../types/profile';
import type { RpgServerResponse, ServerResponse } from '../types/server';
import { RpgServer, Server } from '../types/server';
import type { ShopCategory, ShopTypeResponse } from '../types/shop';
import { ShopType } from '../types/shop';

export class PanthorService {
  static async validateSecret(apiKey: string): Promise<Boolean> {
    try {
      const response = await fetch('https://api.panthor.de/v1/player/validate/' + apiKey);
      const json: ValidSecretResponse | ErrorResponse = await response.json();
      return json.status === 'Success';
    } catch (message) {
      console.error(message);
      return false;
    }
  }

  static async getProfile(apiKey: string): Promise<Profile | null> {
    try {
      const response = await fetch('https://api.panthor.de/v1/player/' + apiKey);
      const json: ApiResponse<ProfileResponse> = await response.json();
      if (!response.ok || json.data === undefined) throw new Error(JSON.stringify(json));
      return new Profile(json.data[0]);
    } catch (message) {
      console.error(message);
      return null;
    }
  }

  static async getVehicles(apiKey: string): Promise<Vehicle[]> {
    try {
      const response = await fetch('https://api.panthor.de/v1/player/' + apiKey + '/vehicles');
      const json: ApiResponse<VehicleResponse> = await response.json();
      return json.data.map((props) => new Vehicle(props));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getChangelogs(): Promise<Changelog[]> {
    try {
      const response = await fetch('https://api.panthor.de/v1/changelog');
      const json: ApiResponse<ChangelogResponse> = await response.json();
      return json.data.map((props) => new Changelog(props));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getServers(): Promise<RpgServer[] | Server[]> {
    try {
      const response = await fetch('https://api.panthor.de/v1/servers');
      const json: ApiResponse<RpgServerResponse | ServerResponse> = await response.json();
      return [
        ...json.data.map((server) =>
          server.Id < 16
            ? new RpgServer(server as RpgServerResponse)
            : new Server(server as ServerResponse)
        ),
      ];
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getMarket(serverId: number): Promise<MarketItem[]> {
    try {
      const response = await fetch('https://api.panthor.de/v1/market/' + serverId);
      const json: ApiResponse<MarketItemResponse> = await response.json();
      return json.data.map((item) => new MarketItem(item));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getShopTypes(category: ShopCategory): Promise<ShopType[]> {
    try {
      const response = await fetch(`https://api.panthor.de/v1/info/${category}_shoptypes`);
      const json: ApiResponse<ShopTypeResponse> = await response.json();
      return json.data.map((shop) => new ShopType(category, shop));
    } catch (message) {
      console.error(message);
      return [];
    }
  }
}
