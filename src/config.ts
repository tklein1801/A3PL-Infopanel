const AppConfig = {
  copBonus: [
    { amount: 0, multiplier: 0.3 },
    { amount: 1, multiplier: 0.3 },
    { amount: 2, multiplier: 0.3 },
    { amount: 3, multiplier: 0.3 },
    { amount: 4, multiplier: 1.15 },
    { amount: 5, multiplier: 1.2 },
    { amount: 6, multiplier: 1.2 },
    { amount: 7, multiplier: 1.2 },
    { amount: 8, multiplier: 1.3 },
    { amount: 9, multiplier: 1.4 },
    { amount: 10, multiplier: 1.4 },
    { amount: 11, multiplier: 1.43 },
    { amount: 12, multiplier: 1.45 },
    { amount: 13, multiplier: 1.5 },
    { amount: 14, multiplier: 1.55 },
    { amount: 15, multiplier: 1.6 },
    { amount: 16, multiplier: 1.65 },
    { amount: 17, multiplier: 1.65 },
    { amount: 18, multiplier: 1.65 },
    { amount: 19, multiplier: 1.65 },
    { amount: 20, multiplier: 1.65 },
  ],
  maintenance: {
    house: {
      /** Show the notification reminder message x days before */
      days: 7,
    },
    rental: {
      /** Show the notification reminder message x days before */
      days: 7,
    },
  },
};

export default AppConfig;
