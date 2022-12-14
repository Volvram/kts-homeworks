export enum CoinCategoriesEnum {
  All = "All",
  Gainer = "Gainer",
  Loser = "Loser",
  Favourite = "Favourite",
}

export const coinCategoriesValue = Object.values(CoinCategoriesEnum).filter(
  (value) => isNaN(Number(value))
);
