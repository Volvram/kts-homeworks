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
} from "mobx";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: string;
  priceChangePercentage24h: string;
};

type PrivateFields = "_currency" | "_coinTrend" | "_coinParams" | "_coins";

export default class CoinListStore implements ILocalStore {
  private _currency: Option = rootStore.currency.currency;
  private _currencies: Option[] = CURRENCIES;
  private _coinTrend: string = rootStore.coinTrend.coinTrend;
  private _coinParams = `${rootStore.query.getParam("search")}`;
  private _coins: Coin[] = [];

  constructor() {
    makeObservable<CoinListStore, PrivateFields>(this, {
      _currency: observable,
      currency: computed,
      currencies: computed,
      _coinTrend: observable,
      coinTrend: computed,
      _coinParams: observable,
      _coins: observable,
      setCoins: action,
    });
  }

  get currency() {
    return this._currency;
  }

  get currencies() {
    return this._currencies;
  }

  get coinTrend() {
    return this._coinTrend;
  }

  setCoins(coins: Coin[]) {
    this._coins = coins;
  }

  getCoins() {
    return this._coins;
  }

  coinRequest = async () => {
    if (this._currency !== null) {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currency?.key.toLowerCase()}`,
      });

      let currencySymbol: string | undefined = this._currency?.symbol;


      if (this._coinParams !== "undefined") {
        log("фильтр с параметрами прошёл")
        this.setCoins(
          result.data
            .filter((coin: any) => {
              const name = coin.name.toLowerCase();
              const symbol = coin.symbol.toLowerCase();
              const params =
                this._coinParams !== undefined
                  ? this._coinParams.toLowerCase()
                  : this._coinParams;
              return name.includes(params) || symbol.includes(params)
            })
            .filter((coin: any) => {
              if (this._coinTrend === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrend === CoinCategories.Loser) {
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
          log("фильтр без параметров прошёл")
        this.setCoins(
          result.data
            .filter((coin: any) => {
              if (this._coinTrend === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrend === CoinCategories.Loser) {
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
    }
  };

  destroy(): void {
    this._currencyHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      this._currency = rootStore.currency.currency;
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => rootStore.coinTrend.coinTrend,
    () => {
      this._coinTrend = rootStore.coinTrend.coinTrend;
    }
  );

  readonly _coinParamsHandler: IReactionDisposer = reaction(
      () => rootStore.query.getParam("search"),
      () => {
          this._coinParams = `${rootStore.query.getParam("search")}`;
      }
  )

  readonly _coinRequestHandler: IReactionDisposer = reaction(
    () => ({
      currency: this._currency,
      coinTrend: this._coinTrend,
      coinParams: this._coinParams,
    }),
    () => {
        this.coinRequest();
    }
  );
}
