import React from "react";

import back from "assets/img/back.svg";
import favourite from "assets/img/favourite.svg";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import { CoinDataModel } from "store/models/CoinData/CoinData";
import { useSaveParams } from "store/RootStore/hooks/useSaveParams";
import { log } from "utils/log";

import styles from "./styles.module.scss";

type HeaderProps = {
  coinData: CoinDataModel | null;
  loading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ coinData, loading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useSaveParams();

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
          <img src={favourite} alt="favourite" />
        </>
      )}
    </div>
  );
};

export default observer(Header);
