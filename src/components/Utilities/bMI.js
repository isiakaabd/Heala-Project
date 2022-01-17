export const calculateBMI = (height, weight) => {
  const h = Number(height);
  const w = Number(weight);
  return ((w / (h * 30.48) / (h * 30.48)) * 10000).toFixed(2);
};
