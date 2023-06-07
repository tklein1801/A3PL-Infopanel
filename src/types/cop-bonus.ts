import AppConfig from '../config';

export class CopBonus {
  copsOnline: number;

  constructor(copsOnline: number) {
    this.copsOnline = copsOnline;
  }

  determineMultiplicator(): number {
    if (this.copsOnline <= 0) return AppConfig.copBonus[0].multiplier;
    const match = AppConfig.copBonus.find((item) => item.amount === this.copsOnline);
    return match ? match.multiplier : AppConfig.copBonus.at(-1)?.multiplier || 0;
  }

  calculatePrice(currentMarketPrice: number) {
    return Math.round(currentMarketPrice * this.determineMultiplicator());
  }
}
