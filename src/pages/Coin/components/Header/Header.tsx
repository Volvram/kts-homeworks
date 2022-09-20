import React from "react";

import back from "assets/img/back.svg";
import favourite from "assets/img/favourite.svg";
import { Button } from "components/Button";
import { getFavourites } from "config/getFavourites";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import HeaderStore from "store/HeaderStore/HeaderStore";
import { CoinDataModel } from "store/models/CoinData/CoinData";
import { useSaveParams } from "store/RootStore/hooks/useSaveParams";
import { log } from "utils/log";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

type HeaderProps = {
  coinData: CoinDataModel | null;
  loading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ coinData, loading = false }) => {
  const headerStore = useLocalStore(() => new HeaderStore());

  const params = useSaveParams();

  React.useEffect(() => {
    headerStore.setCoinDataId(coinData?.id);
  }, [coinData]);

  const handleClick = React.useCallback(() => {
    headerStore.checkFavourite();
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
          <Button onClick={handleClick}>
            <img
              src={favourite}
              className={headerStore.favourite ? styles.header_favourite : ""}
              alt="favourite"
            />
          </Button>
        </>
      )}
    </div>
  );
};

export default observer(Header);
