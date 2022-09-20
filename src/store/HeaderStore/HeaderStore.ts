import { getFavourites } from "config/getFavourites";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
} from "mobx";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_favourite" | "_coinDataId";

export default class HeaderStore implements ILocalStore {
  private _favourite = false;
  private _coinDataId: string | undefined = undefined;

  constructor() {
    makeObservable<HeaderStore, PrivateFields>(this, {
      _favourite: observable,
      setFavourite: action,
      favourite: computed,
      _coinDataId: observable,
      setCoinDataId: action,
      coinDataId: computed,
    });
  }

  setFavourite(value: boolean) {
    this._favourite = value;
  }

  get favourite() {
    return this._favourite;
  }

  setCoinDataId(coinDataid: string | undefined) {
    this._coinDataId = coinDataid;
  }

  get coinDataId() {
    return this._coinDataId;
  }

  checkFavourite() {
    const favourites = getFavourites(); // Получаем избранные из localStorage в нужном виде

    if (favourites && !this._favourite) {
      // Если избранные уже есть и текущая монета не в избранных

      localStorage.setItem(
        "favourites",
        JSON.stringify([this._coinDataId, ...favourites])
      );
      this.setFavourite(true);
    } else if (favourites && this._favourite) {
      // Если избранные уже есть и текущая монета уже в избранных

      const index = favourites.findIndex(
        (coinId: string) => coinId === this._coinDataId
      );
      //   Удаляем монету из избранных
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify([...favourites]));
      this.setFavourite(false);
    } else {
      // Если избранных нет

      localStorage.setItem("favourites", JSON.stringify([this._coinDataId]));
    }

    setTimeout(() => {
      localStorage.clear();
    }, 691200000); // Очистка localStorage через 8 часов
  }

  destroy(): void {
    this._handleFavourite();
  }

  private _handleFavourite: IReactionDisposer = reaction(
    () => this._coinDataId,
    () => {
      const favourites = getFavourites(); // Получаем избранные из localStorage в нужном виде
      const favouriteExists = favourites // Проверяем, существует ли монета в списке избранных
        ? favourites.find((coinId: string) => coinId === this._coinDataId) !==
          undefined
        : false;

      this.setFavourite(favouriteExists); // Отмечаем монету избранной в сторе
    }
  );
}
