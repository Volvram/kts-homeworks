import { OptionType } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, computed, action } from "mobx";

type PrivateFields =
  | "_description"
  | "_defaultOptionDescription"
  | "_currencies";

export default class CurrencyFilterStore implements ILocalStore {
  private _description = "Market-";
  private _defaultOptionDescription = "INR";
  private _currencies: OptionType[] = CURRENCIES;

  constructor() {
    makeObservable<CurrencyFilterStore, PrivateFields>(this, {
      setCurrency: action,
      currency: computed,
      _description: observable,
      description: computed,
      _defaultOptionDescription: observable,
      defaultOptionDescription: computed,
      _currencies: observable,
      currencies: computed,
    });
  }

  setCurrency(currency: OptionType) {
    rootStore.coinFeature.setCurrency(currency);
  }

  get currency() {
    return rootStore.coinFeature.currency;
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
