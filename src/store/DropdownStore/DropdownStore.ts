import { OptionType } from "components/Dropdown/Dropdown";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
} from "mobx";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_onChange" | "_listClosed" | "_choice";

export default class DropDownStore implements ILocalStore {
  private _onChange = (value: OptionType) => {};

  private _listClosed = true;
  private _choice: OptionType | null = null;

  constructor(
    defaultValue: OptionType | null,
    onChange: (value: OptionType) => void
  ) {
    makeObservable<DropDownStore, PrivateFields>(this, {
      _onChange: observable,
      _listClosed: observable,
      _choice: observable,
      toggleListClosed: action,
      listClosed: computed,
      setChoice: action,
      choice: computed,
      destroy: action,
    });

    this._choice = defaultValue;
    this._onChange = onChange;
  }

  toggleListClosed(): void {
    this._listClosed = !this._listClosed;
  }

  get listClosed() {
    return this._listClosed;
  }

  setChoice(newChoice: OptionType | null): void {
    if (newChoice && this._choice?.key !== newChoice?.key) {
      this._choice = newChoice;
    }
  }

  get choice() {
    return this._choice;
  }

  destroy(): void {
    this._listClosed = true;

    this._choiceChangeHandler();
  }

  private readonly _choiceChangeHandler: IReactionDisposer = reaction(
    () => this._choice,
    () => {
      if (this._choice) {
        this._onChange(this._choice);
      }
    }
  );
}
