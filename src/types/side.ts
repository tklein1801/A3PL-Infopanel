import i18next from '@/i18next';

export type Sides =
  | 'CIV'
  | 'ADAC'
  | 'EAST'
  | 'WEST'
  | 'MEDIC'
  | 'GUER'
  | 'civ'
  | 'adac'
  | 'east'
  | 'west'
  | 'medic'
  | 'guer';

export class Side {
  side: Sides;

  constructor(side: Sides) {
    this.side = side;
  }

  getLabel(): string {
    switch (this.side.toUpperCase()) {
      case 'MEDIC':
      case 'GUER':
        return i18next.t('side_medic');
      case 'WEST':
        return i18next.t('side_police');
      case 'ADAC':
      case 'EAST':
        return i18next.t('side_adac');
      case 'CIV':
      default:
        return i18next.t('side_civ');
    }
  }
}
