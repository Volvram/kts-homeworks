import { CoinCategoriesEnum } from "config/coinCategoriesEnum";
import { CURRENCIES, formatCurrency } from "config/currencies";
import { getFavourites } from "config/getFavourites";
import { queryParamsEnum } from "config/queryParamsEnum";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";

import { CoinDataModel } from "../CoinData/CoinData";

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

export const filterCoinItemBySearch = (from: coinItemApi): boolean => {
  const name = from.name.toLowerCase();
  const symbol = from.symbol.toLowerCase();
  const params =
    rootStore.query.getParam(queryParamsEnum.search) !== "undefined"
      ? `${rootStore.query.getParam(queryParamsEnum.search)}`.toLowerCase()
      : `${rootStore.query.getParam(queryParamsEnum.search)}`;
  return name.includes(params) || symbol.includes(params);
};

export const filterCoinItemByTrend = (from: coinItemApi): boolean => {
  const favourites = getFavourites(); // Получаем данные из localStorage в нужном виде

  if (rootStore.coinFeature.coinTrend === CoinCategoriesEnum.Gainer) {
    return from.price_change_percentage_24h > 0;
  } else if (rootStore.coinFeature.coinTrend === CoinCategoriesEnum.Loser) {
    return from.price_change_percentage_24h < 0;
  } else if (rootStore.coinFeature.coinTrend === CoinCategoriesEnum.Favourite) {
    return favourites
      ? Boolean(
          favourites.find((favouriteId: string) => favouriteId === from.id)
        )
      : false;
  } else {
    return true;
  }
};

export const normalizeCoinItem = (from: coinItemApi): coinItemModel => {

  let priceChange = "";

  if (from.price_change_percentage_24h > 0) {
    priceChange = `+${from.price_change_percentage_24h.toFixed(2)}%`;
  } else if (from.price_change_percentage_24h <= 0) {
    priceChange = `${from.price_change_percentage_24h.toFixed(2)}%`;
  }

  const currencyFormat =
  rootStore.coinFeature.currency.key === "rub" ? "ru-RU" : "en-US";

  const formatter = new Intl.NumberFormat(currencyFormat, {
    style: 'currency',
    currency: rootStore.coinFeature.currency.value,
  
    minimumFractionDigits: 0, // (напишет 2500.10 как $2,500.1)
  });

  return {
    // При получении данных с запроса вписать это в .map
    id: from.id,
    name: from.name,
    symbol: from.symbol.toUpperCase(),
    image: from.image,
    currentPrice: formatCurrency(from.current_price),
    priceChangePercentage24h: priceChange,
  };
};


