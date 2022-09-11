import { CoinCategoriesEnum } from "config/coinCategoriesEnum";
import { makeObservable, observable, action, computed } from "mobx";
import rootStore from "store/RootStore/instance";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_clickedCategory";

export default class CoinFilterStore implements ILocalStore {
  private _clickedCategory: CoinCategoriesEnum =
    rootStore.coinFeature.coinTrend;

  constructor() {
    makeObservable<CoinFilterStore, PrivateFields>(this, {
      _clickedCategory: observable,
      clickedCategory: computed,
      setClickedCategory: action,
    });
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
