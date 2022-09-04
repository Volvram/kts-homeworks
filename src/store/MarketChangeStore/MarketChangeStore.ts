import rootStore from "@store/RootStore/instance";
import { log } from "@utils/log";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  reaction,
  IReactionDisposer,
  runInAction,
  toJS,
} from "mobx";

type PrivateFields =
  | "_currency"
  | "_marketChangeSum"
  | "_marketTrend"
  | "_marketColor"
  | "_marketPercentage";

export default class MarketChangeStore implements ILocalStore {
  private _currency = rootStore.currency.currency;
  private _marketChangeSum = 0;
  private _marketPercentage = `${this._marketChangeSum.toFixed(2)}%`;
  private _marketColor = ` neutral`;
  private _marketTrend = "";

  constructor() {
    makeObservable<MarketChangeStore, PrivateFields>(this, {
      _currency: observable,
      currency: computed,
      _marketChangeSum: observable,
      marketChangeSum: computed,
      coinRequest: action,
      _marketPercentage: observable,
      marketPercentage: computed,
      _marketColor: observable,
      marketColor: computed,
      _marketTrend: observable,
      marketTrend: computed,
      destroy: action,
    });
  }

  get currency() {
    return this._currency;
  }

  get marketChangeSum() {
    return this._marketChangeSum;
  }

  get marketPercentage() {
    return this._marketPercentage;
  }

  get marketTrend() {
    return this._marketTrend;
  }

  get marketColor() {
    return this._marketColor;
  }

  coinRequest = async () => {
    this._marketChangeSum = 0;

    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currency?.key}`,
    });

    runInAction(() => {
      result.data.forEach((coin: any) => {
        this._marketChangeSum += coin.price_change_percentage_24h;
      });

      this._marketChangeSum = this._marketChangeSum / result.data.length;

      // if (this._marketChangeSum > 0) {
      //   this._marketPercentage = `+${this._marketChangeSum.toFixed(2)}%`;
      //   this._marketColor = " positive";
      //   this._marketTrend = "up";
      // } else if (this._marketChangeSum < 0) {
      //   this._marketPercentage = `${this._marketChangeSum.toFixed(2)}%`;
      //   this._marketColor = " negative";
      //   this._marketTrend = "down";
      // } else {
      //   this._marketPercentage = `${this._marketChangeSum.toFixed(2)}%`;
      // }
    });
  };

  destroy(): void {
    this._marketChangeSum = 0;
    this._currencyHandler();
    this._marketChangeSumHandler();
    this._marketPercentageHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      if (this._currency !== rootStore.currency.currency)
        this._currency = rootStore.currency.currency;
    }
  );

  readonly _marketChangeSumHandler: IReactionDisposer = reaction(
    () => this._currency,
    () => this.coinRequest()
  );

  readonly _marketPercentageHandler: IReactionDisposer = reaction(
    () => this._marketChangeSum,
    () => {
      if (this._marketChangeSum > 0) {
        this._marketPercentage = `+${this._marketChangeSum.toFixed(2)}%`;
        this._marketColor = " positive";
        this._marketTrend = "up";
      } else if (this._marketChangeSum < 0) {
        this._marketPercentage = `${this._marketChangeSum.toFixed(2)}%`;
        this._marketColor = " negative";
        this._marketTrend = "down";
      } else {
        this._marketPercentage = `${this._marketChangeSum.toFixed(2)}%`;
      }
    }
  );
}
