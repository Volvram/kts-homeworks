import { COLORS } from "@config/colors";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  IReactionDisposer,
  toJS,
  runInAction,
} from "mobx";

export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  currencySymbol: string;
  priceChange24h: number;
  priceChange24hToString: string;
  priceChangePercentage24h: number;
  priceChangePercentage24hToString: string;
};

type PrivateFields = "_id" | "_currency" | "_coinData" | "_priceChangeColor";

export default class CoinStore implements ILocalStore {
  private _id: string | undefined = undefined;
  private _currency = rootStore.currency.currency;
  private _coinData: CoinData = {
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
  };
  private _priceChangeColor: string = COLORS.neutral;

  constructor() {
    makeObservable<CoinStore, PrivateFields>(this, {
      _id: observable,
      setId: action,
      _currency: observable,
      currency: computed,
      _coinData: observable,
      coinData: computed,
      _priceChangeColor: observable,
      priceChangeColor: computed,
      coinDataRequest: action,
    });
  }

  setId(id: string | undefined) {
    if (id) {
      this._id = id;
    }
  }

  get currency() {
    return this._currency;
  }

  get coinData() {
    return this._coinData;
  }

  get priceChangeColor() {
    return this._priceChangeColor;
  }

  coinDataRequest = async () => {
    if (this._currency != null && this._id != undefined) {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${this._id}`,
      });

      const currencyFormat = this._currency.key === "rub" ? "ru-RU" : "en-US";

      runInAction(() => {
        this._coinData.id = result.data.id;
        this._coinData.name = result.data.name;
        this._coinData.symbol = result.data.symbol;
        this._coinData.image = result.data.image.large;
        this._coinData.currentPrice = result.data.market_data.current_price[
          this._currency.key.toLowerCase()
        ]
          .toFixed(2)
          .toLocaleString(currencyFormat);
        this._coinData.currencySymbol = this._currency.symbol;
        this._coinData.priceChange24h =
          result.data.market_data.price_change_24h_in_currency[
            this._currency.key.toLowerCase()
          ].toFixed(3);
        this._coinData.priceChange24hToString = `${result.data.market_data.price_change_24h_in_currency[
          this._currency.key.toLowerCase()
        ].toFixed(3)}`;
        this._coinData.priceChangePercentage24h =
          result.data.market_data.price_change_percentage_24h_in_currency[
            this._currency.key.toLowerCase()
          ].toFixed(2);
        this._coinData.priceChangePercentage24hToString = `${result.data.market_data.price_change_percentage_24h_in_currency[
          this._currency.key.toLowerCase()
        ].toFixed(2)}`;

        if (this._coinData.priceChangePercentage24h > 0) {
          this._coinData.priceChange24hToString = `+ ${this._coinData.priceChange24h}`;
          this._coinData.priceChangePercentage24hToString = `${this._coinData.priceChangePercentage24h}%`;
          this._priceChangeColor = COLORS.positive;
        } else if (this._coinData.priceChangePercentage24h < 0) {
          this._coinData.priceChange24hToString = `- ${-this._coinData
            .priceChange24h}`;
          this._coinData.priceChangePercentage24hToString = `${-this._coinData
            .priceChangePercentage24h}%`;
          this._priceChangeColor = COLORS.negative;
        }
      });
    }
  };

  destroy(): void {
    this._currencyHandler();
  }

  readonly _currencyHandler: IReactionDisposer = reaction(
    () => rootStore.currency.currency,
    () => {
      if (this._currency !== rootStore.currency.currency)
        this._currency = rootStore.currency.currency;
    }
  );

  readonly coinDataHandler: IReactionDisposer = reaction(
    () => this._currency,
    () => {
      this.coinDataRequest();
    }
  );
}
