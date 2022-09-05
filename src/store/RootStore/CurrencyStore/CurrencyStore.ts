import { OptionType } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import { log } from "@utils/log";
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  toJS,
} from "mobx";

type PrivateFields = "_currency";

export default class CurrencyStore {
  private _currency: OptionType = CURRENCIES[0];

  constructor() {
    makeObservable<CurrencyStore, PrivateFields>(this, {
      _currency: observable,
      setCurrency: action,
      currency: computed,
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
}
