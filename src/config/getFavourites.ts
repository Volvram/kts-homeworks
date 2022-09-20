export const getFavourites = (): string[] | null => {
  const favouritesJSON = localStorage.getItem("favourites");
  return favouritesJSON ? JSON.parse(favouritesJSON) : null;
};
