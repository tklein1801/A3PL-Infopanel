import { BONUS, CopBonus } from '../types/cop-bonus';

describe('Verifying cop-bonus calculations', () => {
  const MARKET_PRICE = 100;

  test('Cop: -1', () => {
    const cb = new CopBonus(-1);
    expect(cb.determineMultiplicator()).toBe(0.3);
    expect(cb.calculatePrice(MARKET_PRICE)).toBe(Number(30));
  });

  test('Cop: 1', () => {
    const cb = new CopBonus(1);
    expect(cb.determineMultiplicator()).toBe(0.3);
    expect(cb.calculatePrice(MARKET_PRICE)).toBe(Number(30));
  });

  test('Cop: 4', () => {
    const cb = new CopBonus(4);
    expect(cb.determineMultiplicator()).toBe(1.15);
    expect(cb.calculatePrice(MARKET_PRICE)).toBe(Number(115));
  });

  test('Cop: 20', () => {
    const cb = new CopBonus(20);
    expect(cb.determineMultiplicator()).toBe(1.65);
    expect(cb.calculatePrice(MARKET_PRICE)).toBe(Number(165));
  });

  test('Cop: 21', () => {
    const cb = new CopBonus(21);
    expect(cb.determineMultiplicator()).toBe(1.65);
    expect(cb.calculatePrice(MARKET_PRICE)).toBe(Number(165));
  });
});
