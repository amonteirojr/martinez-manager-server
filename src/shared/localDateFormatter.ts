import { format } from 'date-fns';

export const toLocalDate = (value: string) => {
  if (!value) return;
  const date = new Date(value);
  return format(date, 'dd/MM/yyyy');
};
