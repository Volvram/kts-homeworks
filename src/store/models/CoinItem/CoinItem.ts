import { CURRENCIES } from "@config/currencies";
import rootStore from "@store/RootStore/instance";

export type coinItemApi = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export type coinItemModel = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: string;
  priceChangePercentage24h: string;
};

export const normalizeCoinItem = (from: coinItemApi): coinItemModel => {
  let currencySymbol: string | undefined = CURRENCIES.find(
    (currency) => currency.key === rootStore.currency.currency.key
  )?.symbol;

  let priceChange: string = "";

  if (from.price_change_percentage_24h > 0) {
    priceChange = `+${from.price_change_percentage_24h.toFixed(2)}%`;
  } else if (from.price_change_percentage_24h <= 0) {
    priceChange = `${from.price_change_percentage_24h.toFixed(2)}%`;
  }

  return {
    // При получении данных с запроса вписать это в .map
    id: from.id,
    name: from.name,
    symbol: from.symbol.toUpperCase(),
    image: from.image,
    currentPrice: `${currencySymbol} ${from.current_price.toFixed(2)}`,
    priceChangePercentage24h: priceChange,
  };
};
