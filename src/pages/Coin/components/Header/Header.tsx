import React from "react";

import back from "assets/img/back.svg";
import favourite from "assets/img/favourite.svg";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import { CoinDataModel } from "store/models/CoinData/CoinData";
import { log } from "utils/log";

import styles from "./styles.module.scss";

type HeaderProps = {
  coinData: CoinDataModel | null;
  loading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ coinData, loading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = React.useMemo(() => {
    return searchParams.get("page") && searchParams.get("search")
      ? `?page=${searchParams.get("page")}&search=${searchParams.get("search")}`
      : searchParams.get("page")
      ? `?page=${searchParams.get("page")}`
      : searchParams.get("search")
      ? `?search=${searchParams.get("search")}`
      : "";
  }, [searchParams]);

  return (
    <div className={styles.header}>
      <Link className={styles.header_back} to={`/${params}`}>
        <img src={back} alt="" />
      </Link>
      {!loading && (
        <>
          <img className={styles.header_image} src={coinData?.image} alt="" />
          <div className={styles.header_name}>{coinData?.name}</div>
          <div className={styles.header_symbol}>
            ({coinData?.symbol.toUpperCase()})
          </div>
          <img src={favourite} alt="" />
        </>
      )}
    </div>
  );
};

export default observer(Header);
