import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import {
  ChartPricesModel,
  filterChartPricesByMinutes,
  normalizeChartPricesByH24,
} from "store/models/ChartPrices/ChartPrices";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_id" | "_dates" | "_prices";

export default class CoinCardStore implements ILocalStore {
  private _id: string | undefined;
  private _dates: string[] = [];
  private _prices: number[] = [];

  constructor(id: string | undefined) {
    this._id = id;

    makeObservable<CoinCardStore, PrivateFields>(this, {
      _id: observable,
      _dates: observable,
      dates: computed,
      _prices: observable,
      prices: computed,
      miniChartRequest: action,
    });
  }

  get dates() {
    return this._dates;
  }

  get prices() {
    return this._prices;
  }

  miniChartRequest = async () => { 
    try {
      if (this._id === undefined) return "";

      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${this._id}/market_chart?vs_currency=${rootStore.coinFeature.currency.key}&days=1`,
      });

      runInAction(() => {
        const points: ChartPricesModel[] = result.data.prices
          .filter(filterChartPricesByMinutes)
          .map(normalizeChartPricesByH24)
          .forEach((point: ChartPricesModel) => {
            this._dates.push(point.date);
            this._prices.push(point.price);
          });
      });
    } catch (error) {
      log(error);
    }
  };

  destroy(): void {}
}
