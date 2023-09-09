export const handleBRLNumberFormatter = (value?: number | string) => {
  if (value === undefined) return;
  let brlFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  });

  return brlFormatter.format(Number(value));
};

export const format = (value: number) => handleBRLNumberFormatter(value);

export const handleMoneyOnBRL = (currencyValue: number | string) => {
  if (!currencyValue || currencyValue === '-') {
    return '-';
  }

  var brlFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return brlFormatter.format(Number(currencyValue));
};