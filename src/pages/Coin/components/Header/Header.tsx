import React from "react";

import back from "@assets//img/back.svg";
import favourite from "@assets/img/favourite.svg";
import { Link } from "react-router-dom";

import { CoinData } from "../../../Coin/Coin";
import headerStyle from "./Header.module.scss";

type HeaderProps = {
  coinData: CoinData;
};

const Header: React.FC<HeaderProps> = ({ coinData }) => {
  return (
    <div className={headerStyle.header}>
      <Link className={headerStyle.header_back} to={`/`}>
        <img src={back} alt=""></img>
      </Link>
      <img
        className={headerStyle.header_image}
        src={coinData.image}
        alt=""
      ></img>
      <div className={headerStyle.header_name}>{coinData.name}</div>
      <div className={headerStyle.header_symbol}>
        ({coinData.symbol.toUpperCase()})
      </div>
      <img src={favourite} alt=""></img>
    </div>
  );
};

export default Header;
