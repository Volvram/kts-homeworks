import axios from "axios";
import { OptionType } from "components/Dropdown/Dropdown";
// import { CURRENCIES } from "config/currencies";
import { makeObservable, observable, computed, action } from "mobx";
import rootStore from "store/RootStore/instance";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_currencies" | "_description" | "_defaultOptionDescription";

export default class CurrencyFilterStore implements ILocalStore {
  private _currencies: OptionType[] | null = null;
  private _description = "Market-";
  private _defaultOptionDescription = "USD";

  constructor() {
    makeObservable<CurrencyFilterStore, PrivateFields>(this, {
      _currencies: observable,
      setCurrencies: action,
      setCurrency: action,
      currency: computed,
      _description: observable,
      description: computed,
      _defaultOptionDescription: observable,
      defaultOptionDescription: computed,
    });
  }

  get currencies() {
    return this._currencies;
  }

  setCurrencies(currencies: OptionType[]) {
    this._currencies = currencies;
  }

  setCurrency(currency: OptionType) {
    rootStore.coinFeature.setCurrency(currency);
  }

  get currency() {
    return rootStore.coinFeature.currency;
  }

  get description() {
    return this._description;
  }

  get defaultOptionDescription() {
    return this._defaultOptionDescription;
  }

  getCurrencies = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
    });
  
    this.setCurrencies(result.data
      .map((currency: string) => {
        const currencyFormat = currency === "rub" ? "ru-RU" : "en-US";
        try {
          const formatter = new Intl.NumberFormat(currencyFormat, {
            style: "currency",
            currency: currency.toUpperCase(),
  
            minimumFractionDigits: 2, // (напишет 2500.10 как $2,500.1)
            maximumFractionDigits: 2,
          });
  
          const symbol = formatter.format(0).charAt(0);
          if ((symbol < "a" || symbol > "z") && (symbol < "A" || symbol > "Z")) {
            return {
              key: currency,
              value: currency.toUpperCase(),
            };
          } else {
            return;
          }
        } catch (error) {}
      })
      .filter((currency: string) => currency)
    );
  };

  destroy(): void {}
}
