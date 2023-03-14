const CURRENCY_FORMATTER = new Intl.NumberFormat("fi-Fi", {
  currency: "EUR",
  style: "currency",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("fi-Fi", {
  dateStyle: "short",
});

export const formatDate = (date: Date) => {
  return DATE_FORMATTER.format(date);
};

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};
