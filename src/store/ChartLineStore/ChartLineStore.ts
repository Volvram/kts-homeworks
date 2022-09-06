import styles from "@pages/Coin/components/Chart/styles.module.scss";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, action, computed } from "mobx";

export enum Periods {
  H1 = "1 H",
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
  | "_unclickedStyle";

export default class ChartStore implements ILocalStore {
  private _periods = Object.values(Periods).filter((value) =>
    isNaN(Number(value))
  );
  private _clickedPeriod: string = Periods.H24;
  private _clickedStyle = `${styles.chart_buttons_button} ${styles.chart_buttons_button__clicked}`;
  private _unclickedStyle = `${styles.chart_buttons_button}`;

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

  destroy(): void {}
}
