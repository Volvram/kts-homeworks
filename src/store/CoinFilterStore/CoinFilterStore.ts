import styles from "@pages/Market/components/CoinFilter/styles.module.scss";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, action, computed, reaction } from "mobx";

type PrivateFields =
  | "_categories"
  | "_clickedCategory"
  | "_clickedStyle"
  | "_unclickedStyle";

export default class CoinFilterStore implements ILocalStore {
  private _categories = Object.values(CoinCategories).filter((value) =>
    isNaN(Number(value))
  );
  private _clickedCategory: string = this._categories[0];
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
  }

  get clickedStyle() {
    return this._clickedStyle;
  }

  get unclickedStyle() {
    return this._unclickedStyle;
  }

  destroy(): void {}
}
