import { makeObservable, observable, action, computed } from "mobx";

export enum CoinCategories {
  All = "All",
  Gainer = "Gainer",
  Loser = "Loser",
  Favourite = "Favourite",
}

type PrivateFields = "_coinTrend";

export default class CoinTrendStore {
  private _coinTrend: string = CoinCategories.All;

  constructor() {
    makeObservable<CoinTrendStore, PrivateFields>(this, {
      _coinTrend: observable,
      setCoinTrend: action,
      coinTrend: computed,
    });
  }

  setCoinTrend(coinTrend: string) {
    this._coinTrend = coinTrend;
  }

  get coinTrend() {
    return this._coinTrend;
  }
}
