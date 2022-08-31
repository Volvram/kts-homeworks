import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
} from "mobx";

import DropDownStore from "../DropdownStore/DropdownStore";

type PrivateFields = "_currencies";

class CurrencyFilterStore implements ILocalStore {
  private readonly _dropDownStore = new DropDownStore();
  private _currencies: Option[] = CURRENCIES;
  private _currentCurrency: Option | null = CURRENCIES[0];

  destroy(): void {}

  private readonly _changeCurrencyHandler: IReactionDisposer = reaction(
    () => this._dropDownStore.choice,
    () => {
      this._currentCurrency = this._dropDownStore?.choice;
    }
  );
}

export default CurrencyFilterStore;
