import { Side } from './side';
import type { Sides } from './side';
import i18next from '@/i18next';

export type VehicleType = 'Car' | 'Ship' | 'Air';

export type BaseVehicleResponse = {
  id: number;
  classname: string;
  name: string;
  price: number;
  level: number;
  v_space: number;
  shoptype: string;
  shopname: string;
  type: VehicleType;
};
export class BaseVehicle {
  id: number;
  classname: string;
  name: string;
  price: number;
  level: number;
  v_space: number;
  shoptype: string;
  shopname: string;
  type: VehicleType;

  constructor(data: BaseVehicleResponse) {
    this.id = data.id;
    this.classname = data.classname;
    this.name = data.name;
    this.price = data.price;
    this.level = data.level;
    this.v_space = data.v_space;
    this.shoptype = data.shoptype;
    this.shopname = data.shopname;
    this.type = data.type;
  }

  getVehicleTypeLabel(): string {
    switch (this.type) {
      case 'Air':
        return i18next.t('vehicle_type_air');
      case 'Ship':
        return i18next.t('vehicle_type_sea');
      case 'Car':
        return i18next.t('vehicle_type_land');
    }
  }

  getImage(): string {
    return `https://static.panthor.de/arma/previews/${
      this.classname.includes('_ct_') ? this.classname.split('_ct_')[0] : this.classname
    }.jpg`;
  }
}

export type VehicleResponse = BaseVehicle & {
  pid: string;
  side: Sides;
  plate: string;
  active: number;
  impound: number;
  alarm: number;
  disabled: number;
  color: string;
  inventory: string;
  gear: string;
  fuel: string;
  fuelcargo: number;
  tuning_color: null;
  tuning_array: string;
  tuning_perm: number;
  hitpoints: string;
  kilometer: number;
  kilometer_total: number;
  lastgarage: string;
  alive: number;
  insurance: number;
  companyid: number;
  companytype: string;
  updated_at: string;
  created_at: string;
  vehicle_data: {
    id: number;
    classname: string;
    name: string;
    price: number;
    level: number;
    v_space: number;
    shoptype: string;
    shopname: string;
    type: VehicleType;
  };
  export_vehicles: {
    id: number;
    classname: string;
    name: string;
    price: number;
    level: number;
    v_space: number;
    shoptype: string;
    shopname: string;
    type: VehicleType;
  }[];
};

export class Vehicle extends BaseVehicle {
  pid: string;
  side: Side;
  plate: string;
  active: boolean;
  impound: boolean;
  alarm: boolean;
  disabled: boolean;
  color: number[];
  inventory: string; // FIXME: '"[[],0]"'
  // "\"[[[],[]],[[`RL_Item_viewBarrier`,`RL_Item_Spare_Tire`,`RL_Item_new_Barrier`,`RL_Item_new_Barrier_light`,`RL_Item_barrier_small_light`,`RL_Item_warning_triangle_accident`,`RL_Item_CampFire`,`RL_Item_Jerry_Can`,`RL_Item_Cone_6`,`RL_Item_Toolbox`,`RL_Item_Spotlight`,`RL_Item_Rope`],[3,36,3,3,3,3,1,4,5,1,2,3]],[],[[],[]]]\"",
  gear: string; // FIXME:  "\"[[[],[]],[[`RL_Item_Warndreieck`,`RL_Item_Spare_Tire`],[1,17]],[],[]]\""
  fuel: number;
  fuelcargo: number;
  tuning_color: null;
  tuning_array: string; // FIXME:
  tuning_perm: boolean;
  hitpoints: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  kilometer: number;
  kilometer_total: number;
  lastgarage: string;
  alive: boolean;
  insurance: boolean;
  companyid: number;
  companytype: string;
  updated_at: Date;
  created_at: Date;
  vehicle_data: VehicleResponse['vehicle_data'];
  export_vehicles: VehicleResponse['export_vehicles'];

  constructor(data: VehicleResponse) {
    super(data);

    this.pid = data.pid;
    this.side = new Side(data.side);
    this.plate = data.plate;
    this.active = data.active === 1;
    this.impound = data.impound === 1;
    this.alarm = data.alarm === 1;
    this.disabled = data.disabled === 1;
    this.color = JSON.parse(data.color);
    this.inventory = data.inventory; // FIXME:
    this.gear = data.gear; // FIXME:
    this.fuel = Number(data.fuel);
    this.fuelcargo = data.fuelcargo;
    this.tuning_color = data.tuning_color;
    this.tuning_array = data.tuning_array;
    this.tuning_perm = data.tuning_perm === 1;
    this.hitpoints = JSON.parse(data.hitpoints);
    this.kilometer = data.kilometer;
    this.kilometer_total = data.kilometer_total;
    this.lastgarage = data.lastgarage;
    this.alive = data.alive === 1;
    this.insurance = data.insurance === 1;
    this.companyid = data.companyid;
    this.companytype = data.companytype;
    this.updated_at = new Date(data.updated_at);
    this.created_at = new Date(data.created_at);
    this.vehicle_data = data.vehicle_data;
    this.export_vehicles = data.export_vehicles;
  }

  // getGear(): void {
  //   const a = JSON.parse(this.gear.replaceAll('`', "'"));
  //   const b: [[any[], any[]], [string[], number[]], any[], any[]] = a;
  //   console.log(b[1]);
  // }
}
