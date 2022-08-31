import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  action,
  computed,
  reaction,
  IReactionDisposer,
} from "mobx";
import * as qs from "qs";

export default class MarketSearchStore implements ILocalStore {
  private _params:
    | null
    | string
    | string[]
    | qs.ParsedQs
    | qs.ParsedQs[]
    | undefined = rootStore.query.getParam("search");

  constructor() {
    makeObservable(this, {
      params: computed,
      paramsToString: computed,
    });
  }

  get params() {
    return this._params;
  }

  get paramsToString() {
    if (this._params) {
      return `${this._params}`;
    } else {
      return "";
    }
  }

  destroy(): void {
    this._params = null;
    this._paramsChangeHandler();
  }

  private _paramsChangeHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => (this._params = rootStore.query.getParam("search"))
  );
}
