import { ILocalStore } from "@utils/useLocalStore";
import { makeObservable, observable, action, computed, reaction } from "mobx";

type PrivateFields = "";

export default class CoinFilterStore implements ILocalStore {
  destroy(): void {}
}
