import { BuildingDTO, type BuildingDTOResponse } from './BuildingDTO';

export type BuildingResponse = BuildingDTOResponse & {
  players: string[];
};

export class Building extends BuildingDTO {
  players: string[];

  constructor(data: BuildingResponse) {
    super({ ...data });
    this.players = data.players;
  }
}
