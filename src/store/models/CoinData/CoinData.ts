import { COLORS } from "@config/colors";
import rootStore from "@store/RootStore/instance";

export type CoinDataApi = {
  id: string;
  name: string;
  symbol: string;
  image: any;
  current_price: number;
  currency_symbol: string;
  market_data: any;
};

export type CoinDataModel = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  currencySymbol: string;
  priceChange24h: number;
  priceChange24hToString: string;
  priceChangePercentage24h: number;
  priceChangePercentage24hToString: string;
  priceChangeColor: COLORS;
};

export const normalizeCoinData = (from: CoinDataApi): CoinDataModel => {
  const currencyFormat =
    rootStore.coinFeature.currency.key === "rub" ? "ru-RU" : "en-US";

  const price_change_percentage_24h =
    from.market_data.price_change_percentage_24h_in_currency[
      rootStore.coinFeature.currency.key.toLowerCase()
    ].toFixed(2);
  const price_change_24h =
    from.market_data.price_change_24h_in_currency[
      rootStore.coinFeature.currency.key.toLowerCase()
    ].toFixed(3);

  let tempPriceChange24hToString = "";
  let tempPriceChangePercentage24hToString = "";
  let tempPriceChangeColor: COLORS = COLORS.neutral;

  if (price_change_percentage_24h > 0) {
    tempPriceChange24hToString = `+ ${price_change_24h}`;
    tempPriceChangePercentage24hToString = `${price_change_percentage_24h}%`;
    tempPriceChangeColor = COLORS.positive;
  } else if (price_change_percentage_24h < 0) {
    tempPriceChange24hToString = `- ${-price_change_24h}`;
    tempPriceChangePercentage24hToString = `${-price_change_percentage_24h}%`;
    tempPriceChangeColor = COLORS.negative;
  }

  return {
    id: from.id,
    name: from.name,
    symbol: from.symbol,
    image: from.image.large,
    currentPrice: from.market_data.current_price[
      rootStore.coinFeature.currency.key.toLowerCase()
    ]
      .toFixed(2)
      .toLocaleString(currencyFormat),
    currencySymbol: rootStore.coinFeature.currency.symbol,
    priceChange24h: price_change_24h,
    priceChange24hToString: tempPriceChange24hToString,
    priceChangePercentage24h: price_change_percentage_24h,
    priceChangePercentage24hToString: tempPriceChangePercentage24hToString,
    priceChangeColor: tempPriceChangeColor,
  };
};
