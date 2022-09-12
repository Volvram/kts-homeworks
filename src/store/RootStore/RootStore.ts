import CoinFeatureStore from "./CoinFeatureStore/CoinFeatureStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly coinFeature = new CoinFeatureStore();
}
