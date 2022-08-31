import CoinTrendStore from "./CoinTrendStore/CoinTrendStore";
import CurrencyStore from "./CurrencyStore/CurrencyStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly currency = new CurrencyStore();
  readonly coinTrend = new CoinTrendStore();
}
