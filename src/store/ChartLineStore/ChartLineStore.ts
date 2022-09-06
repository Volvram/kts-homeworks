import styles from "@pages/Coin/components/ChartLine/styles.module.scss";
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
  runInAction,
  IReactionDisposer,
} from "mobx";

export enum Periods {
  H24 = "24 H",
  W1 = "1 W",
  M1 = "1 M",
  M6 = "6 M",
  Y1 = "1 Y",
}

type PrivateFields =
  | "_periods"
  | "_clickedPeriod"
  | "_clickedStyle"
  | "_unclickedStyle"
  | "_id"
  | "_dates"
  | "_prices";

export default class ChartStore implements ILocalStore {
  private _periods = Object.values(Periods).filter((value) =>
    isNaN(Number(value))
  );
  private _clickedPeriod: string = Periods.H24;
  private _clickedStyle = `${styles.chart_buttons_button} ${styles.chart_buttons_button__clicked}`;
  private _unclickedStyle = `${styles.chart_buttons_button}`;

  // chart fields
  private _id: string | undefined = undefined;
  private _dates: string[] = [];
  private _prices: number[] = [];

  constructor() {
    makeObservable<ChartStore, PrivateFields>(this, {
      _periods: observable,
      periods: computed,
      _clickedPeriod: observable,
      setClickedPeriod: action,
      clickedPeriod: computed,
      _clickedStyle: observable,
      clickedStyle: computed,
      _unclickedStyle: observable,
      unclickedStyle: computed,
      _id: observable,
      setId: action,
      _dates: observable,
      dates: computed,
      _prices: observable,
      prices: computed,
      pricesRequest: action,
    });
  }

  get periods() {
    return this._periods;
  }

  setClickedPeriod(period: string) {
    this._clickedPeriod = period;
  }

  get clickedPeriod() {
    return this._clickedPeriod;
  }

  get clickedStyle() {
    return this._clickedStyle;
  }

  get unclickedStyle() {
    return this._unclickedStyle;
  }

  handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    this.setClickedPeriod(target.textContent);
  };

  setId(id: string | undefined) {
    if (id) {
      this._id = id;
    }
  }

  get dates() {
    return this._dates;
  }

  get prices() {
    return this._prices;
  }

  pricesRequest = async () => {
    let days: number = 1;
    if (this._clickedPeriod == Periods.H24) {
      days = 1;
    } else if (this._clickedPeriod == Periods.W1) {
      days = 7;
    } else if (this._clickedPeriod == Periods.M1) {
      days = 30;
    } else if (this._clickedPeriod == Periods.M6) {
      days = 183;
    } else if (this._clickedPeriod == Periods.Y1) {
      days = 365;
    }

    if (this._id != undefined) {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${this._id}/market_chart?vs_currency=${rootStore.currency.currency.key}&days=${days}`,
      });

      runInAction(() => {
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        if (this._clickedPeriod == Periods.H24) {
          result.data.prices
            .filter((price: number[]) => {
              return (
                new Date(price[0]).getMinutes() == 0 ||
                new Date(price[0]).getMinutes() == 1
              );
            })
            .map((price: number[]) => {
              this._dates.push(`${new Date(price[0]).getHours()}:00`);
              this._prices.push(price[1]);
            });
        } else if (this._clickedPeriod == Periods.W1) {
          result.data.prices
            .filter((price: number[]) => {
              return new Date(price[0]).getHours() == 0;
            })
            .map((price: number[]) => {
              const day = weekday[new Date(price[0]).getDay()];

              this._dates.push(day);
              this._prices.push(price[1]);
            });
        } else if (this._clickedPeriod == Periods.M1) {
          result.data.prices
            .filter((price: number[]) => {
              return new Date(price[0]).getHours() == 0;
            })
            .map((price: number[]) => {
              const month = months[new Date(price[0]).getMonth()];

              this._dates.push(`${new Date(price[0]).getDate()} ${month}`);
              this._prices.push(price[1]);
            });
        } else if (this._clickedPeriod == Periods.M6) {
          result.data.prices
            .filter((price: number[]) => {
              return new Date(price[0]).getDate() == 1;
            })
            .map((price: number[]) => {
              const month = months[new Date(price[0]).getMonth()];
              this._dates.push(month);
              this._prices.push(price[1]);
            });
        } else if (this._clickedPeriod == Periods.Y1) {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          result.data.prices
            .filter((price: number[]) => {
              return new Date(price[0]).getDate() == 1;
            })
            .map((price: number[]) => {
              const month = months[new Date(price[0]).getMonth()];
              this._dates.push(month);
              this._prices.push(price[1]);
            });
        }
      });
    } else {
      log("id not found");
    }
  };

  destroy(): void {
    this._periodChangeHandler();
  }

  readonly _periodChangeHandler: IReactionDisposer = reaction(
    () => this._clickedPeriod,
    () => {
      this._dates.length = 0;
      this._prices.length = 0;
      this.pricesRequest();
    }
  );
}
