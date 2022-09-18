import axios from "axios";
import { COLORS } from "config/colors";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
  runInAction,
} from "mobx";
import {
  CoinDataModel,
  normalizeCoinData,
} from "store/models/CoinData/CoinData";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_id" | "_coinData" | "_loading";

export default class CoinStore implements ILocalStore {
  private _id: string | undefined;
  private _coinData: CoinDataModel = {
    id: "",
    name: "",
    symbol: "",
    image: "",
    currentPrice: 0,
    currencySymbol: "",
    priceChange24h: 0,
    priceChange24hToString: "",
    priceChangePercentage24h: 0,
    priceChangePercentage24hToString: "",
    priceChangeColor: COLORS.neutral,
  };
  private _loading = true;

  constructor(id: string | undefined) {
    this._id = id;

    makeObservable<CoinStore, PrivateFields>(this, {
      _id: observable,
      currency: computed,
      _coinData: observable,
      coinData: computed,
      _loading: observable,
      setLoading: action,
      loading: computed,
      coinDataRequest: action,
    });
  }

  get currency() {
    return rootStore.coinFeature.currency;
  }

  get coinData() {
    return this._coinData;
  }

  setLoading(loading: boolean) {
    this._loading = loading;
  }

  get loading() {
    return this._loading;
  }

  coinDataRequest = async () => {
    if (rootStore.coinFeature.currency === null && this._id === undefined)
      return;

    try {
      this.setLoading(true);
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${this._id}`,
      });

      runInAction(() => {
        if (result.data) {
          this._coinData = normalizeCoinData(result.data);
        } else {
          throw new Error("Empty result");
        }
        this.setLoading(false);
      });
    } catch (error) {
      log(error);
    }
  };

  destroy(): void {
    this._coinDataHandler();
  }

  readonly _coinDataHandler: IReactionDisposer = reaction(
    () => rootStore.coinFeature.currency,
    () => {
      this.coinDataRequest();
    }
  );
}
