import { OptionType } from "@components/Dropdown/Dropdown";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
} from "mobx";

type PrivateFields = "_onChange" | "_listClosed" | "_choice";

export default class DropDownStore implements ILocalStore {
  private _onChange = (value: OptionType) => {};

  private _listClosed: boolean = true;
  private _choice: OptionType | null = null;

  constructor() {
    makeObservable<DropDownStore, PrivateFields>(this, {
      _onChange: observable,
      setOnChange: action,
      _listClosed: observable,
      _choice: observable,
      setListClosed: action,
      listClosed: computed,
      setChoice: action,
      choice: computed,
      destroy: action,
    });
  }

  setOnChange(onChange: (value: OptionType) => void) {
    this._onChange = onChange;
  }

  setListClosed(): void {
    this._listClosed = !this._listClosed;
  }

  get listClosed() {
    return this._listClosed;
  }

  setChoice(newChoice: OptionType | null): void {
    if (newChoice && this._choice?.key != newChoice?.key) {
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
