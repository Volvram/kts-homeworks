import React from "react";

import back from "@assets/img/back.svg";
import favourite from "@assets/img/favourite.svg";
import { CoinData } from "@store/CoinStore/CoinStore";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

type HeaderProps = {
  coinData: CoinData;
};

const Header: React.FC<HeaderProps> = ({ coinData }) => {
  return (
    <div className={styles.header}>
      <Link className={styles.header_back} to={`/`}>
        <img src={back} alt="" />
      </Link>
      <img className={styles.header_image} src={coinData.image} alt="" />
      <div className={styles.header_name}>{coinData.name}</div>
      <div className={styles.header_symbol}>
        ({coinData.symbol.toUpperCase()})
      </div>
      <img src={favourite} alt="" />
    </div>
  );
};

export default Header;
