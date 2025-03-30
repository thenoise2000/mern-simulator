export const calculateSimpleInterest = (capital, rate, months) => {
  const monthlyRate = rate / 100;
  let results = [];
  let currentCapital = capital;
  let totalProfit = 0;

  for (let i = 1; i <= months; i++) {
      const monthlyProfit = capital * monthlyRate;
      totalProfit += monthlyProfit;
      currentCapital = capital;
      results.push({ month: i, profit: monthlyProfit, total: currentCapital + totalProfit });
  }

  return results;
};

export const calculateCompoundInterest = (capital, rate, months) => {
  const monthlyRate = rate / 100;
  let results = [];
  let currentCapital = capital;

  for (let i = 1; i <= months; i++) {
      const monthlyProfit = currentCapital * monthlyRate;
      currentCapital += monthlyProfit;
      results.push({ month: i, profit: monthlyProfit, total: currentCapital });
  }
  return results;
};

export const calculateFee = (amount) => {
  if (amount >= 1 && amount <= 1000) return 0.02;
  if (amount >= 1001 && amount <= 10000) return 0.01;
  if (amount >= 10001 && amount <= 35000) return 0.005;
  return 0.0025;
};