export const handleBRLNumberFormatter = (value?: number | string) => {
  if (value === undefined) return;
  let brlFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  });

  return brlFormatter.format(Number(value));
};

export const format = (value: number) => handleBRLNumberFormatter(value);
