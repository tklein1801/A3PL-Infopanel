import { HouseDTO, HouseDTOResponse } from './HouseDTO';

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
