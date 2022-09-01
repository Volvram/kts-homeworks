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
  private _params: null
  | string
  | string[]
  | qs.ParsedQs
  | qs.ParsedQs[]
  | undefined = rootStore.query.getParam("search");
  

  constructor() {
    makeObservable(this, {
      params: computed,
    });
  }

  get params() {
    return this._params;
  }

  destroy(): void {
    this._params = "";
    this._paramsChangeHandler();
  }

  private _paramsChangeHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => {
      if (this._params = rootStore.query.getParam("search")) {
        this._params = rootStore.query.getParam("search");
      }
    }
  ) 
}
