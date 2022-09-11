import {
  filterCoinItemBySearch,
  filterCoinItemByTrend,
  normalizeCoinItem,
} from "store/models/CoinItem/CoinItem";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";
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
  | "_coins"
  | "_currentItems"
  | "_pageCount"
  | "_itemsPerPage"
  | "_itemOffset";

export default class CoinListStore implements ILocalStore {
  private _coins: Coin[] = [];

  // fields for pagination
  private _currentItems: Coin[] | null = null;
  private _pageCount = 0;
  private _itemsPerPage = 5;
  private _itemOffset = -1;

  constructor() {
    makeObservable<CoinListStore, PrivateFields>(this, {
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

  get currencyParams() {
    return rootStore.coinFeature.currency;
  }

  get coinTrendParams() {
    return rootStore.coinFeature.coinTrend;
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
    try {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${rootStore.coinFeature.currency.key}`,
      });

      runInAction(() => {
        if (result.data) {
          if (searchParams !== null && searchParams !== undefined) {
            this.setCoins(
              result.data
                .filter(filterCoinItemBySearch)
                .filter(filterCoinItemByTrend)
                .map(normalizeCoinItem)
            );
          } else {
            this.setCoins(
              result.data.filter(filterCoinItemByTrend).map(normalizeCoinItem)
            );
          }
        } else {
          throw new Error("Empty result");
        }
      });
    } catch (error) {
      log(error);
    }
  };

  handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * this._itemsPerPage) % this._coins.length;
    this.setItemOffset(newOffset);
    this.changePage();
  };

  changePage = async () => {
    await this.coinRequest(rootStore.query.getParam("search"));
    const endOffset = this._itemOffset + this._itemsPerPage;
    this.setCurrentItems(this._coins.slice(this._itemOffset, endOffset));
    this.setPageCount(Math.ceil(this._coins.length / this._itemsPerPage));
  };

  destroy(): void {
    this._currencyHandler();
    this._coinTrendHandler();
    this._searchHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.coinFeature.currency,
    () => {
      this.changePage();
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => rootStore.coinFeature.coinTrend,
    () => {
      this.changePage();
    }
  );

  readonly _searchHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (searchParams) => {
      this.changePage();
    }
  );
}
