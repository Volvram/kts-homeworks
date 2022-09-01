import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import rootStore from "@store/RootStore/instance";
import { log } from "@utils/log";
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
  toJS,
} from "mobx";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: string;
  priceChangePercentage24h: string;
};

type PrivateFields =
  | "_currencyParams"
  | "_coinTrendParams"
  | "_searchParams"
  | "_coins";

export default class CoinListStore implements ILocalStore {
  private _currencies: Option[] = CURRENCIES;
  private _currencyParams = `${rootStore.query.getParam("currency")}`;
  private _coinTrendParams = `${rootStore.query.getParam("coinTrend")}`;
  private _searchParams = `${rootStore.query.getParam("search")}`;
  private _coins: Coin[] = [];

  constructor() {
    makeObservable<CoinListStore, PrivateFields>(this, {
      currencies: computed,
      _currencyParams: observable,
      _coinTrendParams: observable,
      _searchParams: observable,
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

  coinRequest = async () => {
    const requestParams =
      this._currencyParams === "undefined" || this._currencyParams === ""
        ? CURRENCIES[0].key
        : this._currencyParams;

    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${requestParams}`,
    });

    runInAction(() => {
      let currencySymbol: string | undefined = this._currencies.find(
        (currency) => currency.key === requestParams
      )?.symbol;

      if (this._searchParams !== "undefined") {
        this.setCoins(
          result.data
            .filter((coin: any) => {
              const name = coin.name.toLowerCase();
              const symbol = coin.symbol.toLowerCase();
              const params =
                this._searchParams !== undefined
                  ? this._searchParams.toLowerCase()
                  : this._searchParams;
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
    this._searchHandler();
    this._coinRequestHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => `${rootStore.query.getParam("currency")}`,
    () => {
      if (this._currencyParams !== `${rootStore.query.getParam("currency")}`)
        this._currencyParams = `${rootStore.query.getParam("currency")}`;
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => `${rootStore.query.getParam("coinTrend")}`,
    () => {
      if (this._coinTrendParams !== `${rootStore.query.getParam("coinTrend")}`)
        this._coinTrendParams = `${rootStore.query.getParam("coinTrend")}`;
    }
  );

  readonly _searchHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => {
      if (this._searchParams !== `${rootStore.query.getParam("search")}`)
        this._searchParams = `${rootStore.query.getParam("search")}`;
    }
  );

  readonly _coinRequestHandler: IReactionDisposer = reaction(
    () => ({
      currencyParams: this._currencyParams,
      coinTrendParams: this._coinTrendParams,
      searchParams: this._searchParams,
    }),
    () => {
      this.coinRequest();
    }
  );
}
