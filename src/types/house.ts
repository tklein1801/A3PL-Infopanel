import { addHours } from 'date-fns';
import { HouseDTO, HouseDTOResponse } from './HouseDTO';
import type { PositionResponse } from './position';
import { Position } from './position';

/**
 * Attributes for server houses
 */
export type ServerHouseResponse = {
  id: number;
  location: PositionResponse;
  players: string[];
};

export class ServerHouse {
  id: number;
  location: Position;
  players: string[];

  constructor({ id, location, players }: ServerHouseResponse) {
    this.id = id;
    this.location = new Position(location);
    this.players = players;
  }
}

export type HouseResponse = HouseDTOResponse & {
  players: string[];
};

export class House extends HouseDTO {
  players: string[];

  constructor(data: HouseResponse) {
    super({ ...data });
    this.players = data.players;
  }
}

export type BuildingResponse = ServerHouseResponse & {
  classname: string;
  stage: number;
  disabled: number;
};

export class Building extends ServerHouse {
  classname: string;
  stage: number;
  disabled: boolean;

  constructor(data: BuildingResponse) {
    super({ ...data });
    this.classname = data.classname;
    this.stage = data.stage;
    this.disabled = data.disabled === 1 || data.stage < 1;
  }
}
