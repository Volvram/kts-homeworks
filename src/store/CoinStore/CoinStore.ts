import { COLORS } from "config/colors";
import {
  CoinDataModel,
  normalizeCoinData,
} from "store/models/CoinData/CoinData";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { ILocalStore } from "utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
  runInAction,
} from "mobx";

type PrivateFields = "_id" | "_coinData";

export default class CoinStore implements ILocalStore {
  private _id: string | undefined = undefined;
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

  constructor(id: string | undefined) {
    makeObservable<CoinStore, PrivateFields>(this, {
      _id: observable,
      currency: computed,
      _coinData: observable,
      coinData: computed,
      coinDataRequest: action,
    });

    this._id = id;
  }

  get currency() {
    return rootStore.coinFeature.currency;
  }

  get coinData() {
    return this._coinData;
  }

  coinDataRequest = async () => {
    if (rootStore.coinFeature.currency === null && this._id === undefined)
      return;

    try {
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
