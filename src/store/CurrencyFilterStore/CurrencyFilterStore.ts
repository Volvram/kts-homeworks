import { OptionType } from "components/Dropdown/Dropdown";
import { makeObservable, observable, computed, action } from "mobx";
import rootStore from "store/RootStore/instance";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_description" | "_defaultOptionDescription";

export default class CurrencyFilterStore implements ILocalStore {
  private _description = "Market-";
  private _defaultOptionDescription = "USD";

  constructor() {
    makeObservable<CurrencyFilterStore, PrivateFields>(this, {
      setCurrency: action,
      currency: computed,
      _description: observable,
      description: computed,
      _defaultOptionDescription: observable,
      defaultOptionDescription: computed,
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

  destroy(): void {}
}
