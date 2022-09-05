import styles from "@pages/Market/components/CoinFilter/styles.module.scss";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateFields =
  | "_categories"
  | "_clickedCategory"
  | "_clickedStyle"
  | "_unclickedStyle";

export default class CoinFilterStore implements ILocalStore {
  private _categories = Object.values(CoinCategories).filter((value) =>
    isNaN(Number(value))
  );
  private _clickedCategory: string = rootStore.coinTrend.coinTrend;
  private _clickedStyle = `${styles.coin__filter_choice}  ${styles.coin__filter_choice__clicked}`;
  private _unclickedStyle = `${styles.coin__filter_choice}`;

  constructor() {
    makeObservable<CoinFilterStore, PrivateFields>(this, {
      _categories: observable,
      categories: computed,
      _clickedCategory: observable,
      clickedCategory: computed,
      setClickedCategory: action,
      _clickedStyle: observable,
      clickedStyle: computed,
      _unclickedStyle: observable,
      unclickedStyle: computed,
    });
  }

  get categories() {
    return this._categories;
  }

  get clickedCategory() {
    return this._clickedCategory;
  }

  setClickedCategory(category: string) {
    this._clickedCategory = category;
    rootStore.coinTrend.setCoinTrend(category);
  }

  get clickedStyle() {
    return this._clickedStyle;
  }

  get unclickedStyle() {
    return this._unclickedStyle;
  }

  handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    this.setClickedCategory(target.textContent);
  };

  destroy(): void {}
}
