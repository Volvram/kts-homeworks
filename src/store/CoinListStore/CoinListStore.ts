import axios from "axios";
import { CoinCategoriesEnum } from "config/coinCategoriesEnum";
import { queryParamsEnum } from "config/queryParamsEnum";
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
import {
  filterCoinItemBySearch,
  filterCoinItemByTrend,
  normalizeCoinItem,
} from "store/models/CoinItem/CoinItem";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";

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
  | "_loadingItems"
  | "_currentItems"
  | "_pageCount"
  | "_itemsPerPage"
  | "_itemOffset";

export default class CoinListStore implements ILocalStore {
  private _coins: Coin[] = [];
  private _loadingItems = true;

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
      _loadingItems: observable,
      setLoadingItems: action,
      loadingItems: computed,
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

  setLoadingItems(loading: boolean) {
    this._loadingItems = loading;
  }

  get loadingItems() {
    return this._loadingItems;
  }

  // Поля для пагинации
  get currentItems() {
    return this._currentItems;
  }

  setCurrentItems(currentItems: Coin[] | null) {
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
      this.setCurrentItems(null);
      this.setLoadingItems(true);

      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${rootStore.coinFeature.currency.key}`,
      });

      runInAction(() => {
        if (!result.data) throw new Error("Empty data");
        if (searchParams) {
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
        this.setLoadingItems(false);
      });
    } catch (error) {
      log(error);
    }
  };

  handlePageClick = async (event: { selected: number }) => {
    await this.coinRequest(rootStore.query.getParam(queryParamsEnum.search));

    const newOffset =
      (event.selected * this._itemsPerPage) % this._coins.length;
    this.setItemOffset(newOffset);
    this.changePage();
  };

  changePage = () => {
    const endOffset = this._itemOffset + this._itemsPerPage;
    this._coins.length !== 0
      ? this.setCurrentItems(this._coins.slice(this._itemOffset, endOffset))
      : this.setCurrentItems(null);
    this.setPageCount(Math.ceil(this._coins.length / this._itemsPerPage));
  };

  destroy(): void {}
}
