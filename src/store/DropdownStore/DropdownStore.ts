import { Option } from "@components/Dropdown/Dropdown";
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
  private _onChange = (value: Option) => {};

  private _listClosed: boolean = true;
  private _choice: Option | null = null;

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
    });
  }

  setOnChange(onChange: (value: Option) => void) {
    this._onChange = onChange;
  }

  setListClosed(): void {
    this._listClosed = !this._listClosed;
  }
  get listClosed() {
    return this._listClosed;
  }
  setChoice(newChoice: Option | null): void {
    if (newChoice != null) {
      this._choice = newChoice;
    }
  }
  get choice() {
    return this._choice;
  }

  destroy(): void {
    this._listClosed = true;
    this._choice = null;

    this._choiceChangeHandler();
  }

  private readonly _choiceChangeHandler: IReactionDisposer = reaction(
    () => this._choice,
    () => {
      if (this._choice) this._onChange(this._choice);
    }
  );
}
