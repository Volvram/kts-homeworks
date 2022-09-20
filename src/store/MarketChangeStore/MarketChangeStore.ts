import axios from "axios";
import { COLORS } from "config/colors";
import {
  makeObservable,
  observable,
  action,
  computed,
  reaction,
  IReactionDisposer,
  runInAction,
} from "mobx";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields =
  | "_marketChangeAverage"
  | "_marketTrend"
  | "_marketColor"
  | "_marketPercentage";

export default class MarketChangeStore implements ILocalStore {
  private _marketChangeAverage = 0;
  private _marketPercentage = `${this._marketChangeAverage.toFixed(2)}%`;
  private _marketColor: COLORS = COLORS.neutral;
  private _marketTrend = "";

  constructor() {
    makeObservable<MarketChangeStore, PrivateFields>(this, {
      currency: computed,
      _marketChangeAverage: observable,
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
    return rootStore.coinFeature.currency;
  }

  get marketChangeSum() {
    return this._marketChangeAverage;
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
    this._marketChangeAverage = 0;

    try {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${rootStore.coinFeature.currency?.key}`,
      });

      runInAction(() => {
        if (!result.data) throw new Error("Empty data");

        let priceChangePercentage24h = 0;

        result.data.forEach((coin: any) => {
          priceChangePercentage24h += coin.price_change_percentage_24h;
        });

        this._marketChangeAverage =
          priceChangePercentage24h / result.data.length;
      });
    } catch (error) {
      log(error);
    }
  };

  destroy(): void {
    this._marketChangeAverage = 0;
    this._marketChangeSumHandler();
    this._marketPercentageHandler();
  }

  readonly _marketChangeSumHandler: IReactionDisposer = reaction(
    () => rootStore.coinFeature.currency,
    () => this.coinRequest()
  );

  readonly _marketPercentageHandler: IReactionDisposer = reaction(
    () => this._marketChangeAverage,
    () => {
      if (this._marketChangeAverage > 0) {
        this._marketPercentage = `+${this._marketChangeAverage.toFixed(2)}%`;
        this._marketColor = COLORS.positive;
        this._marketTrend = "up";
      } else if (this._marketChangeAverage < 0) {
        this._marketPercentage = `${this._marketChangeAverage.toFixed(2)}%`;
        this._marketColor = COLORS.negative;
        this._marketTrend = "down";
      } else {
        this._marketPercentage = `${this._marketChangeAverage.toFixed(2)}%`;
      }
    }
  );
}
