export const formatDateToLocaleString = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const currencyFormatter = (value: string | number) => {
  if (!value) return;
  if (typeof value === 'string') value = parseFloat(value);
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const CNPJFormatter = (value: string) => {
  if (!value) return;
  const formattedCNPJ = value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  );

  return formattedCNPJ;
};
