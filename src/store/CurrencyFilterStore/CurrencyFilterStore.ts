import { OptionType } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, computed, action } from "mobx";

type PrivateFields = "_currency";

export default class CurrencyFilterStore implements ILocalStore {
  private _currency: OptionType = rootStore.currency.currency;
  private _description = "Market-";
  private _defaultOptionDescription = "INR";
  private _currencies: OptionType[] = CURRENCIES;

  constructor() {
    makeObservable<CurrencyFilterStore, PrivateFields>(this, {
      _currency: observable.ref,
      setCurrency: action,
      currency: computed,
      description: computed,
      defaultOptionDescription: computed,
      currencies: computed,
    });
  }

  setCurrency(currency: OptionType) {
    rootStore.currency.setCurrency(currency);

    if (currency != this._currency) {
      this._currency = currency;
    }
  }

  get currency() {
    return this._currency;
  }

  get description() {
    return this._description;
  }

  get defaultOptionDescription() {
    return this._defaultOptionDescription;
  }

  get currencies() {
    return this._currencies;
  }

  destroy(): void {}
}
