import axios from "axios";
import { OptionType } from "components/Dropdown/Dropdown";
import rootStore from "store/RootStore/instance";

export const formatCurrency = (price: number) => {
  const currencyFormat =
    rootStore.coinFeature.currency.key === "rub" ? "ru-RU" : "en-US";
  const formatter = new Intl.NumberFormat(currencyFormat, {
    style: "currency",
    currency: rootStore.coinFeature.currency.value,

    minimumFractionDigits: 2, // (напишет 2500.10 как $2,500.1)
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
};

export const getCurrencies = async () => {
  const result = await axios({
    method: "get",
    url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
  });

  const currencies = result.data
    .map((currency: string) => {
      const currencyFormat = currency === "rub" ? "ru-RU" : "en-US";
      try {
        const formatter = new Intl.NumberFormat(currencyFormat, {
          style: "currency",
          currency: currency.toUpperCase(),

          minimumFractionDigits: 2, // (напишет 2500.10 как $2,500.1)
          maximumFractionDigits: 2,
        });

        const symbol = formatter.format(0).charAt(0);
        if ((symbol < "a" || symbol > "z") && (symbol < "A" || symbol > "Z")) {
          return {
            key: currency,
            value: currency.toUpperCase(),
          };
        } else {
          return;
        }
      } catch (error) {}
    })
    .filter((currency: string) => currency);

  return new Promise((resolve) => {
    resolve(currencies);
  });
};

export let CURRENCIES: OptionType[];

getCurrencies().then((currencies) => {
  CURRENCIES = Object.assign([], currencies);
});
