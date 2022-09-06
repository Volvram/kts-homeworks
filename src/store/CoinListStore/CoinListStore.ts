import { OptionType } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import {
  coinItemApi,
  normalizeCoinItem,
} from "@store/models/CoinItem/CoinItem";
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
  | "_itemOffset";

export default class CoinListStore implements ILocalStore {
  private _currencies: OptionType[] = CURRENCIES;
  private _currencyParams = rootStore.currency.currency;
  private _coinTrendParams = rootStore.coinTrend.coinTrend;
  private _coins: Coin[] = [];

  // fields for pagination
  private _currentItems: Coin[] | null = null;
  private _pageCount = 0;
  private _itemsPerPage = 5;
  private _itemOffset = -1;

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
      setCurrentItems: action,
      _pageCount: observable,
      pageCount: computed,
      setPageCount: action,
      _itemOffset: observable,
      itemOffset: computed,
      setItemOffset: action,
      handlePageClick: action,
      _itemsPerPage: observable,
      setItemsPerPage: action,
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

  setCurrentItems(currentItems: Coin[]) {
    this._currentItems = currentItems;
  }

  get pageCount() {
    return this._pageCount;
  }

  setPageCount(pageCount: number) {
    this._pageCount = pageCount;
  }

  get itemsPerPage() {
    return this._itemsPerPage;
  }

  setItemOffset(itemOffset: number) {
    this._itemOffset = itemOffset;
  }

  get itemOffset() {
    return this._itemOffset;
  }

  setItemsPerPage(itemsPerPage: number) {
    this._itemsPerPage = itemsPerPage;
  }

  coinRequest = async (
    searchParams: string | null | string[] | ParsedQs | ParsedQs[] | undefined
  ) => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currencyParams.key}`,
    });

    runInAction(() => {
      if (searchParams != null && searchParams != undefined) {
        this.setCoins(
          result.data
            .filter((coin: coinItemApi) => {
              const name = coin.name.toLowerCase();
              const symbol = coin.symbol.toLowerCase();
              const params =
                searchParams != "undefined"
                  ? `${searchParams}`.toLowerCase()
                  : `${searchParams}`;
              return name.includes(params) || symbol.includes(params);
            })
            .filter((coin: coinItemApi) => {
              if (this._coinTrendParams === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrendParams === CoinCategories.Loser) {
                return coin.price_change_percentage_24h < 0;
              } else {
                return true;
              }
            })
            .map(normalizeCoinItem)
        );
      } else {
        this.setCoins(
          result.data
            .filter((coin: coinItemApi) => {
              if (this._coinTrendParams === CoinCategories.Gainer) {
                return coin.price_change_percentage_24h > 0;
              } else if (this._coinTrendParams === CoinCategories.Loser) {
                return coin.price_change_percentage_24h < 0;
              } else {
                return true;
              }
            })
            .map(normalizeCoinItem)
        );
      }
    });
  };

  handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * this._itemsPerPage) % this._coins.length;
    log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    this.setItemOffset(newOffset);
    this.changePage();
  };

  changePage() {
    this.coinRequest(rootStore.query.getParam("search")).then(() => {
      const endOffset = this._itemOffset + this._itemsPerPage;
      log(`Loading items from ${this._itemOffset} to ${endOffset}`);
      this.setCurrentItems(this._coins.slice(this._itemOffset, endOffset));
      this.setPageCount(Math.ceil(this._coins.length / this._itemsPerPage));
    });
  }

  destroy(): void {
    this._currencyParamsHandler();
    this._coinTrendParamsHandler();
    this._currencyHandler();
    this._coinTrendHandler();
    this._searchHandler();
  }

  readonly _currencyParamsHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      if (this._currencyParams !== rootStore.currency.currency)
        this._currencyParams = rootStore.currency.currency;
    }
  );

  readonly _coinTrendParamsHandler: IReactionDisposer = reaction(
    () => rootStore.coinTrend.coinTrend,
    () => {
      if (this._coinTrendParams !== rootStore.coinTrend.coinTrend)
        this._coinTrendParams = rootStore.coinTrend.coinTrend;
    }
  );

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => this._currencyParams,
    () => {
      this.changePage();
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => this._coinTrendParams,
    () => {
      this.changePage();
    }
  );

  readonly _searchHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (searchParams) => {
      log("search: ", toJS(searchParams));
      this.changePage();
    }
  );
}
