import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  action,
  reaction,
  IReactionDisposer,
  computed,
} from "mobx";

type PrivateFields = "_currencyParams" | "_coinTrendParams";

export default class MarketStore implements ILocalStore {
  private _currencyParams:
    | undefined
    | string
    | string[]
    | qs.ParsedQs
    | qs.ParsedQs[] = rootStore.query.getParam("currency");
  private _coinTrendParams:
    | undefined
    | string
    | string[]
    | qs.ParsedQs
    | qs.ParsedQs[] = rootStore.query.getParam("coinTrend");

  constructor() {
    makeObservable<MarketStore, PrivateFields>(this, {
      _currencyParams: observable.ref,
      currencyParams: computed,
      _coinTrendParams: observable.ref,
      coinTrendParams: computed,
    });
  }

  get currencyParams() {
    return this._currencyParams;
  }

  get coinTrendParams() {
    return this._coinTrendParams;
  }

  destroy(): void {
    this._currencyParamsHandler();
    this._coinTrendParamsHandler();
  }

  readonly _currencyParamsHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("currency"),
    () => {
      if (this._currencyParams !== rootStore.query.getParam("currency"))
        this._currencyParams = rootStore.query.getParam("currency");
    }
  );
  readonly _coinTrendParamsHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("currency"),
    () => {
      if (this._currencyParams !== rootStore.query.getParam("currency"))
        this._coinTrendParams = rootStore.query.getParam("currency");
    }
  );
}
