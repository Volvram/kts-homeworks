import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
  runInAction,
} from "mobx";
import { ParsedQs } from "qs";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: string;
  priceChangePercentage24h: string;
};

type PrivateFields = "_currencyParams" | "_coinTrendParams" | "_coins";

export default class CoinListStore implements ILocalStore {
  private _currencies: Option[] = CURRENCIES;
  private _currencyParams = rootStore.currency.currency;
  private _coinTrendParams = rootStore.coinTrend.coinTrend;
  private _coins: Coin[] = [];

  constructor() {
    makeObservable<CoinListStore, PrivateFields>(this, {
      currencies: computed,
      _currencyParams: observable,
      _coinTrendParams: observable,
      _coins: observable,
      setCoins: action,
    });
  }

  get currencies() {
    return this._currencies;
  }

  setCoins(coins: Coin[]) {
    this._coins = coins;
  }

  getCoins() {
    return this._coins;
  }

  coinRequest = async (
    searchParams: string | null | string[] | ParsedQs | ParsedQs[] | undefined
  ) => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currencyParams.key}`,
    });

    runInAction(() => {
      let currencySymbol: string | undefined = this._currencies.find(
        (currency) => currency.key === this._currencyParams.key
      )?.symbol;

      if (searchParams != null && searchParams != undefined) {
        this.setCoins(
          result.data
            .filter((coin: any) => {
              const name = coin.name.toLowerCase();
              const symbol = coin.symbol.toLowerCase();
              const params =
                searchParams != "undefined"
                  ? `${searchParams}`.toLowerCase()
                  : `${searchParams}`;
              return name.includes(params) || symbol.includes(params);
            })
            .filter((coin: any) => {
              if (this._coinTrendParams === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrendParams === CoinCategories.Loser) {
                return coin.price_change_percentage_24h < 0;
              } else {
                return true;
              }
            })
            .map((coin: any) => {
              let priceChange: string = "";

              if (coin.price_change_percentage_24h > 0) {
                priceChange = `+${coin.price_change_percentage_24h.toFixed(
                  2
                )}%`;
              } else if (coin.price_change_percentage_24h <= 0) {
                priceChange = `${coin.price_change_percentage_24h.toFixed(2)}%`;
              }

              return {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                image: coin.image,
                currentPrice: `${currencySymbol} ${coin.current_price.toFixed(
                  2
                )}`,
                priceChangePercentage24h: priceChange,
              };
            })
        );
      } else {
        this.setCoins(
          result.data
            .filter((coin: any) => {
              if (this._coinTrendParams === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrendParams === CoinCategories.Loser) {
                return coin.price_change_percentage_24h < 0;
              } else {
                return true;
              }
            })
            .map((coin: any) => {
              let priceChange: string = "";

              if (coin.price_change_percentage_24h > 0) {
                priceChange = `+${coin.price_change_percentage_24h.toFixed(
                  2
                )}%`;
              } else if (coin.price_change_percentage_24h <= 0) {
                priceChange = `${coin.price_change_percentage_24h.toFixed(2)}%`;
              }

              return {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                image: coin.image,
                currentPrice: `${currencySymbol} ${coin.current_price.toFixed(
                  2
                )}`,
                priceChangePercentage24h: priceChange,
              };
            })
        );
      }
    });
  };

  destroy(): void {
    this._currencyHandler();
    this._coinTrendHandler();
    this._coinRequestHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      if (this._currencyParams !== rootStore.currency.currency)
        this._currencyParams = rootStore.currency.currency;
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => rootStore.coinTrend.coinTrend,
    () => {
      if (this._coinTrendParams !== rootStore.coinTrend.coinTrend)
        this._coinTrendParams = rootStore.coinTrend.coinTrend;
    }
  );

  readonly _coinRequestHandler: IReactionDisposer = reaction(
    () => ({
      currencyParams: this._currencyParams,
      coinTrendParams: this._coinTrendParams,
      searchParams: rootStore.query.getParam("search"),
    }),
    ({ currencyParams, coinTrendParams, searchParams }) => {
      this.coinRequest(searchParams);
    }
  );
}
