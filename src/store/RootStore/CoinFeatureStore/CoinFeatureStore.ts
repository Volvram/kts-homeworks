import { OptionType } from "components/Dropdown/Dropdown";
import { CoinCategoriesEnum } from "config/coinCategoriesEnum";
import { CURRENCIES } from "config/currencies";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateFields = "_currency" | "_coinTrend";

export default class CoinFeatureStore {
  private _currency: OptionType = {
    key: "usd",
    value: "USD",
  };
  private _coinTrend = CoinCategoriesEnum.All;

  constructor() {
    makeObservable<CoinFeatureStore, PrivateFields>(this, {
      _currency: observable,
      setCurrency: action,
      currency: computed,
      _coinTrend: observable,
      setCoinTrend: action,
      coinTrend: computed,
    });
  }

  setCurrency(currency: OptionType) {
    if (this._currency !== currency) {
      this._currency = currency;
    }
  }

  get currency() {
    return this._currency;
  }

  setCoinTrend(coinTrend: CoinCategoriesEnum) {
    this._coinTrend = coinTrend;
  }

  get coinTrend() {
    return this._coinTrend;
  }
}
