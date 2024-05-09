import { Panthor } from '@/constants';
import type { ApiResponse } from './api_response';

const ILLEGAL_ITEMS = [
  'cocaine_r',
  'fentanyl_r',
  'heroin_r',
  'lsd',
  'moonshiner',
  'purple_haze_r',
  'white_russian_r',
  'white_widow_r',
  'wine_r',
  'met',
  'vodka',
  'beer',
];

export type MarketItemResponse = {
  item: string;
  price: number;
  server: number;
  updated_at: string;
  created_at: string;
  localized: string;
  export_virt_item?: {
    item: string;
    name: string;
    sellPrice: number;
    buyPrice: number;
    illegal: number;
    exp: number;
    weight: number;
    market: number;
    icon: string;
  };
};

export type ItemBacklogResponse = {
  id: number;
  item: string;
  price: number;
  server_id: number;
  created_at: string;
};

export class ItemBacklog {
  id: number;
  item: string;
  price: number;
  serverId: number;
  createdAt: Date;

  constructor({ id, item, price, server_id, created_at }: ItemBacklogResponse) {
    this.id = id;
    this.item = item;
    this.price = price;
    this.serverId = server_id;
    this.createdAt = new Date(created_at);
  }
}

export class MarketItem {
  item: string;
  price: number;
  server: number;
  updatedAt: Date;
  createdAt: Date;
  localized: string;
  exportVirtItem?: {
    item: string;
    name: string;
    sellPrice: number;
    buyPrice: number;
    illegal: boolean;
    exp: number;
    weight: number;
    market: number;
    icon: string;
  };

  constructor({ item, price, server, updated_at, created_at, localized, export_virt_item }: MarketItemResponse) {
    this.item = item;
    this.price = price;
    this.server = server;
    this.updatedAt = new Date(updated_at);
    this.createdAt = new Date(created_at);
    this.localized = localized;
    if (export_virt_item) {
      this.exportVirtItem = {
        ...export_virt_item,
        illegal: this.isIllegal(),
      };
    }
  }

  isIllegal(): boolean {
    return this.exportVirtItem ? this.exportVirtItem.illegal : ILLEGAL_ITEMS.includes(this.item);
  }

  static getImageUrl(itemClassname: string): string {
    return `/market_icons/${itemClassname}.png`;
  }

  getImageUrl() {
    return MarketItem.getImageUrl(this.item);
  }

  getRawWeight(): number {
    return ItemWeights.get(this.item)?.raw ?? 0;
  }

  getProcessedWeight(): number {
    return ItemWeights.get(this.item)?.processed ?? 0;
  }

  async getPriceBacklog(server: number, backlogCount: number) {
    try {
      const response = await fetch(`${Panthor.apiBaseUrl}/v1/market_logs/${server}/${this.item}/${backlogCount}`);
      const backlog: ApiResponse<[ItemBacklogResponse]> = await response.json();
      return backlog.data[0].map((item) => new ItemBacklog(item));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export const ItemWeights: Map<MarketItem['item'], { raw: number; processed: number }> = new Map([
  ['aluminum_r', { raw: 4, processed: 3 }],
  ['apple', { raw: 2, processed: 2 }],
  ['applepie', { raw: 6, processed: 4 }],
  ['applewine', { raw: 4, processed: 2 }],
  ['apple_juice', { raw: 4, processed: 3 }],
  ['beer', { raw: 6, processed: 3 }],
  ['biscuit', { raw: 11, processed: 4 }],
  ['bread', { raw: 4, processed: 2 }],
  ['cable', { raw: 9, processed: 5 }],
  ['charcoal_r', { raw: 5, processed: 3 }],
  ['clayplate', { raw: 10, processed: 5 }],
  ['clay_r', { raw: 5, processed: 4 }],
  ['cocaine_r', { raw: 5, processed: 4 }],
  ['concrete', { raw: 8, processed: 5 }],
  ['copper_r', { raw: 4, processed: 3 }],
  ['cotton_r', { raw: 4, processed: 2 }],
  ['crab', { raw: 4, processed: 2 }],
  ['crab_rolls', { raw: 8, processed: 3 }],
  ['detergent', { raw: 10, processed: 3 }],
  ['door', { raw: 9, processed: 5 }],
  ['fentanyl_r', { raw: 5, processed: 4 }],
  ['fishfilet', { raw: 3, processed: 2 }],
  ['fishsticks', { raw: 7, processed: 3 }],
  ['grainbooze', { raw: 0, processed: 0 }], // TODO:
  ['grape_juice', { raw: 4, processed: 3 }],
  ['heroin_r', { raw: 5, processed: 4 }],
  ['honey_r', { raw: 3, processed: 2 }],
  ['iron_r', { raw: 4, processed: 3 }],
  ['jewellery', { raw: 5, processed: 3 }],
  ['lsd', { raw: 15, processed: 5 }],
  ['meat_r', { raw: 4, processed: 3 }],
  ['moonshiner', { raw: 8, processed: 2 }],
  ['oil_r', { raw: 5, processed: 4 }],
  ['pearl', { raw: 5, processed: 2 }],
  ['plastic', { raw: 5, processed: 3 }],
  ['potato', { raw: 2, processed: 2 }],
  ['potatobread', { raw: 6, processed: 4 }],
  ['precious_metal_r', { raw: 5, processed: 4 }],
  ['purple_haze_r', { raw: 3, processed: 2 }],
  ['rock_r', { raw: 4, processed: 4 }],
  ['roll', { raw: 0, processed: 0 }], // TODO:
  ['rubber', { raw: 5, processed: 4 }],
  ['rye_r', { raw: 0, processed: 0 }], //TODO:
  ['sand_r', { raw: 4, processed: 3 }],
  ['shell_r', { raw: 5, processed: 5 }],
  ['steel', { raw: 9, processed: 5 }],
  ['sugar_r', { raw: 3, processed: 2 }],
  ['thermal_insulation', { raw: 8, processed: 5 }],
  ['tissue', { raw: 0, processed: 0 }], // TODO:
  ['titanium_r', { raw: 5, processed: 4 }],
  ['vodka', { raw: 4, processed: 3 }],
  ['wheat_r', { raw: 4, processed: 3 }],
  ['white_russian_r', { raw: 3, processed: 2 }],
  ['white_widow_r', { raw: 3, processed: 2 }],
  ['window', { raw: 9, processed: 5 }],
  ['wine_r', { raw: 4, processed: 2 }],
  ['wine_u', { raw: 4, processed: 2 }],
  ['wood_r', { raw: 5, processed: 5 }],
]);
