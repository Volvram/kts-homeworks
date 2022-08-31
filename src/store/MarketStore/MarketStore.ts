import { Option } from "@components/Dropdown/Dropdown";
import { CoinCategories } from "@pages/Market/components/CoinFilter/CoinFilter";
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

type PrivateFields = "_currency" | "_coinTrend";

export default class MarketStore implements ILocalStore {
  private _currency: Option = rootStore.currency.currency;
  private _coinTrend: string = rootStore.coinTrend.coinTrend;

  constructor() {
    makeObservable<MarketStore, PrivateFields>(this, {
      _currency: observable,
      setCurrency: action,
      currency: computed,
      _coinTrend: observable,
      setCoinTrend: action,
      coinTrend: computed,
    });
  }

  setCurrency(coinCurrency: Option) {
    this._currency = coinCurrency;
    rootStore.currency.setCurrency(coinCurrency);
  }

  get currency() {
    return this._currency;
  }

  setCoinTrend(coinTrend: string) {
    this._coinTrend = coinTrend;
    rootStore.coinTrend.setCoinTrend(coinTrend);
  }

  get coinTrend() {
    return this._coinTrend;
  }

  destroy(): void {
    this._currencyHandler();
    this._coinTrendHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      this._currency = rootStore.currency.currency;
    }
  );

  readonly _coinTrendHandler: IReactionDisposer = reaction(
    () => rootStore.coinTrend.coinTrend,
    () => {
      this._coinTrend = rootStore.coinTrend.coinTrend;
    }
  );
}
