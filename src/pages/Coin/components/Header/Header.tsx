import React from "react";

import back from "assets/img/back.svg";
import favourite from "assets/img/favourite.svg";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import { CoinDataModel } from "store/models/CoinData/CoinData";
import { useSaveParams } from "store/RootStore/hooks/useSaveParams";
import { log } from "utils/log";

import styles from "./styles.module.scss";
import { Button } from "components/Button";
import { toJS } from "mobx";

type HeaderProps = {
  coinData: CoinDataModel | null;
  loading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ coinData, loading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFavourite, setIsFavourite] = React.useState(false);

  const params = useSaveParams();

  // React.useEffect(() => {
  //   const favouritesJSON = localStorage.getItem("favourites");
  //   const favourites = favouritesJSON ? JSON.parse(favouritesJSON) : null;
  //   const favouriteExists = favourites ? favourites.find((coin: CoinDataModel) => coin.id === coinData?.id) !== undefined : false;

  //   setIsFavourite(favouriteExists);
  //   log(favouriteExists);
  //   log(favourites);
  // }, []);

  const handleClick = React.useCallback(() => {

    const favouritesJSON = localStorage.getItem("favourites");
    const favourites = favouritesJSON ? JSON.parse(favouritesJSON) : null;
    const favouriteExists = favourites ? favourites.find((coin: CoinDataModel) => coin.id === coinData?.id) !== undefined : false;

    if (favourites && !favouriteExists) {
      localStorage.setItem("favourites", JSON.stringify([coinData, ...favourites]));
    } else if (favourites && favouriteExists) {
      const index = favourites.findIndex((coin: CoinDataModel) => coin.id === coinData?.id);
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify([...favourites]))
    }
    else {
      localStorage.setItem("favourites", JSON.stringify([coinData]));
    }

    setTimeout(() => {localStorage.clear()}, 691200000);  // Очистка localStorage через 8 часов
  }, [coinData]);

  return (
    <div className={styles.header}>
      <Link className={styles.header_back} to={`/${params}`}>
        <img src={back} alt="back" />
      </Link>
      {!loading && (
        <>
          <img
            className={styles.header_image}
            src={coinData?.image}
            alt="coin avatar"
          />
          <div className={styles.header_name}>{coinData?.name}</div>
          <div className={styles.header_symbol}>
            ({coinData?.symbol.toUpperCase()})
          </div>
          <Button className={isFavourite ? styles.header_favourite : ""} onClick={handleClick}><img src={favourite} alt="favourite" /></Button>
        </>
      )}
    </div>
  );
};

export default observer(Header);
