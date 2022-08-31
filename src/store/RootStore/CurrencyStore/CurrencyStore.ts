import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateFields = "_currency";

export default class CurrencyStore {
  private _currency: Option = CURRENCIES[0];

  constructor() {
    makeObservable<CurrencyStore, PrivateFields>(this, {
      _currency: observable,
      setCurrency: action,
      currency: computed,
    });
  }

  setCurrency(currency: Option) {
    this._currency = currency;
  }

  get currency() {
    return this._currency;
  }
}
