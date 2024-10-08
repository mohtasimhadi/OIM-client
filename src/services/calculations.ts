export const getAverageValue = <T extends Record<string, any>>(
  data: T[],
  key: keyof T
): number => {
  if (data.length === 0) return 0;
  const total = data.reduce((sum, item) => sum + (item[key] as number), 0);
  const average = total / data.length;

  return parseFloat(average.toFixed(2));
};
