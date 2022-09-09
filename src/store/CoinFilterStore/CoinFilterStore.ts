import { CoinCategoriesEnum } from "@config/coinCategoriesEnum";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateFields = "_categories" | "_clickedCategory";

export default class CoinFilterStore implements ILocalStore {
  private _categories = Object.values(CoinCategoriesEnum).filter((value) =>
    isNaN(Number(value))
  );
  private _clickedCategory: CoinCategoriesEnum =
    rootStore.coinFeature.coinTrend;

  constructor() {
    makeObservable<CoinFilterStore, PrivateFields>(this, {
      _categories: observable,
      categories: computed,
      _clickedCategory: observable,
      clickedCategory: computed,
      setClickedCategory: action,
    });
  }

  get categories() {
    return this._categories;
  }

  get clickedCategory() {
    return this._clickedCategory;
  }

  setClickedCategory(category: CoinCategoriesEnum) {
    this._clickedCategory = category;
    rootStore.coinFeature.setCoinTrend(category);
  }

  handleClick = (category: CoinCategoriesEnum) => {
    return (event: React.MouseEvent) => {
      this.setClickedCategory(category);
    };
  };

  destroy(): void {}
}
