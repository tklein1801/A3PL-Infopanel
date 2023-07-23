import { addHours } from 'date-fns';
import { Position } from './position';

export type HouseDTOResponse = {
  id: number;
  payed_for: number;
  disabled: number;
  location: string;
};

export class HouseDTO {
  id: number;
  /** `payed_for` in hours */
  payed_for: number;
  active_until: Date;
  disabled: boolean;
  location: string;

  constructor(data: HouseDTOResponse) {
    this.id = data.id;
    this.payed_for = data.payed_for;
    this.active_until = addHours(new Date(), data.payed_for);
    this.disabled = data.disabled === 1;
    this.location = data.location;
  }

  public getPosition(): Position {
    return new Position(this.location);
  }
}
