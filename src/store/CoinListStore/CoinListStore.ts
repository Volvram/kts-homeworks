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
} from "mobx";
import { ParsedQs } from "qs";

export type Coin = {
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
  | "_coins"
  | "_currentItems"
  | "_pageCount"
  | "_itemsPerPage"
  | "_itemOffset"
  | "_endOffset";

export default class CoinListStore implements ILocalStore {
  private _currencies: Option[] = CURRENCIES;
  private _currencyParams = rootStore.currency.currency;
  private _coinTrendParams = rootStore.coinTrend.coinTrend;
  private _coins: Coin[] = [];

  // fields for pagination
  private _currentItems: Coin[] | null = null;
  private _pageCount = 0;
  private _itemsPerPage = 5;
  private _itemOffset = 0;

  private _endOffset = 0;

  constructor() {
    makeObservable<CoinListStore, PrivateFields>(this, {
      currencies: computed,
      _currencyParams: observable,
      _coinTrendParams: observable,
      _coins: observable,
      setCoins: action,
      coins: computed,
      _currentItems: observable,
      currentItems: computed,
      _pageCount: observable,
      pageCount: computed,
      _itemOffset: observable,
      setItemOffset: action,
      _itemsPerPage: observable,
      setItemsPerPage: action,
      _endOffset: observable,
      endOffset: computed,
      coinsFetch: action,
    });
  }

  get currencies() {
    return this._currencies;
  }

  get currencyParams() {
    return this._currencyParams;
  }

  get coinTrendParams() {
    return this._coinTrendParams;
  }

  setCoins(coins: Coin[]) {
    this._coins = coins;
  }

  get coins() {
    return this._coins;
  }

  // fields for pagination
  get currentItems() {
    return this._currentItems;
  }

  get pageCount() {
    return this._pageCount;
  }

  setItemOffset(itemOffset: number) {
    this._itemOffset = itemOffset;
  }

  setItemsPerPage(itemsPerPage: number) {
    this._itemsPerPage = itemsPerPage;
  }

  get endOffset() {
    return this._endOffset;
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

  handlePageClick = (event: { selected: number }) => {
    const newOffset: number =
      (event.selected * this._itemsPerPage) % this._coins.length;
    log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    this.setItemOffset(newOffset);
  };

  coinsFetch = async (
    searchParams: string | ParsedQs | string[] | ParsedQs[] | undefined
  ) => {
    await this.coinRequest(searchParams);

    runInAction(() => {
      this._endOffset = this._itemOffset + this._itemsPerPage;
      log(`Loading items from ${this._itemOffset} to ${this._endOffset}`);
      this._currentItems = this._coins.slice(this._itemOffset, this._endOffset);
      this._pageCount = Math.ceil(this._coins.length / this._itemsPerPage);
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
      itemOffset: this._itemOffset,
      itemsPerPage: this._itemsPerPage,
    }),
    ({ currencyParams, coinTrendParams, searchParams }) => {
      this.coinsFetch(searchParams);
    }
  );
}
