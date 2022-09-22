import rootStore from "store/RootStore/instance";

export const formatCurrency = (price: number) => {
  const currencyFormat =
    rootStore.coinFeature.currency.key === "rub" ? "ru-RU" : "en-US";
  const formatter = new Intl.NumberFormat(currencyFormat, {
    style: "currency",
    currency: rootStore.coinFeature.currency.value,

    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
};
