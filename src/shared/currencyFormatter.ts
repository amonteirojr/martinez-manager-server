export const currencyFormatter = (value: string | number) => {
  if (!value) return;
  if (typeof value === 'string') value = parseFloat(value);
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
