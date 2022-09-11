import axios from "axios";
import { PeriodsEnum } from "config/periodsEnum";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import {
  ChartPricesModel,
  filterChartPricesByDays,
  filterChartPricesByHours,
  filterChartPricesByMinutes,
  normalizeChartPricesByH24,
  normalizeChartPricesByM1,
  normalizeChartPricesByM6,
  normalizeChartPricesByW1,
  normalizeChartPricesByY1,
} from "store/models/ChartPrices/ChartPrices";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_clickedPeriod" | "_id" | "_dates" | "_prices";

export default class ChartStore implements ILocalStore {
  private _clickedPeriod: PeriodsEnum = PeriodsEnum.H24;

  // chart fields
  private _id: string | undefined = undefined;
  private _dates: string[] = [];
  private _prices: number[] = [];

  constructor(id: string | undefined) {
    makeObservable<ChartStore, PrivateFields>(this, {
      _clickedPeriod: observable,
      setClickedPeriod: action,
      clickedPeriod: computed,
      _id: observable,
      _dates: observable,
      dates: computed,
      _prices: observable,
      prices: computed,
      pricesRequest: action,
    });

    this._id = id;
  }

  setClickedPeriod(period: PeriodsEnum) {
    this._clickedPeriod = period;
    this._dates.length = 0;
    this._prices.length = 0;
    this.pricesRequest();
  }

  get clickedPeriod() {
    return this._clickedPeriod;
  }

  handleClick = (period: PeriodsEnum) => {
    return (event: React.MouseEvent) => {
      this.setClickedPeriod(period);
    };
  };

  get dates() {
    return this._dates;
  }

  get prices() {
    return this._prices;
  }

  pricesRequest = async () => {
    if (this._id === undefined) return "";

    const mapPeriodToDays: Record<string, number> = {
      "24 H": 1,
      "1 W": 7,
      "1 M": 30,
      "6 M": 183,
      "1 Y": 365,
    };

    const days = mapPeriodToDays[this._clickedPeriod];

    try {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${this._id}/market_chart?vs_currency=${rootStore.coinFeature.currency.key}&days=${days}`,
      });

      runInAction(() => {
        let points: ChartPricesModel[] = [];

        if (this._clickedPeriod === PeriodsEnum.H24) {
          points = result.data.prices
            .filter(filterChartPricesByMinutes)
            .map(normalizeChartPricesByH24);
        } else if (this._clickedPeriod === PeriodsEnum.W1) {
          points = result.data.prices
            .filter(filterChartPricesByHours)
            .map(normalizeChartPricesByW1);
        } else if (this._clickedPeriod === PeriodsEnum.M1) {
          points = result.data.prices
            .filter(filterChartPricesByHours)
            .map(normalizeChartPricesByM1);
        } else if (this._clickedPeriod === PeriodsEnum.M6) {
          points = result.data.prices
            .filter(filterChartPricesByDays)
            .map(normalizeChartPricesByM6);
        } else if (this._clickedPeriod === PeriodsEnum.Y1) {
          points = result.data.prices
            .filter(filterChartPricesByDays)
            .map(normalizeChartPricesByY1);
        }
        points.forEach((point: ChartPricesModel) => {
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
