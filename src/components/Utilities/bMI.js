export const calculateBMI = (height, weight) => {
  const h = Number(height);
  const w = Number(weight);
  return w / ((h / 100) * (h / 100)).toFixed(2);
};
