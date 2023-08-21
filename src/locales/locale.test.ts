import deLocales from './de.json';
import enLocales from './en.json';

console.log(deLocales);
console.log(enLocales);

describe('Check if translations are compelte', () => {
  it('No translation is missing', () => {
    const deCount = Object.keys(deLocales);
    const enCount = Object.keys(enLocales);
    expect(deCount.length).toBe(enCount.length);

    const missingKeys = deCount.filter((key) => !enCount.includes(key));
    expect(missingKeys.length).toBe(0);
    expect(missingKeys).toStrictEqual([]);
  });
});
