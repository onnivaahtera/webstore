const CURRENCY_FORMATTER = new Intl.NumberFormat("fi-Fi", {
  currency: "EUR",
  style: "currency",
});

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};
