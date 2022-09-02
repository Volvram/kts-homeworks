import React from "react";

import { Card } from "@components/Card/Card";
import { Option } from "@components/Dropdown/Dropdown";
import CoinStore from "@store/CoinStore/CoinStore";
import { useLocalStore } from "@utils/useLocalStore";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import coinStyle from "./Coin.module.scss";
import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";

export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  currencySymbol: string;
  priceChange24h: number;
  priceChangePercentage24h: number;
};

const Coin: React.FC = () => {
  const { id } = useParams();

  const coinStore = useLocalStore(() => new CoinStore());

  React.useEffect(() => {
    coinStore.setId(id);
    coinStore.coinDataRequest();
  }, []);

  return (
    <div className={coinStyle.coinPage}>
      <Header coinData={coinStore.coinData} />
      <div className={coinStyle.price}>
        <div className={coinStyle.price_current}>
          <div className={coinStyle.price_current_currency}>
            {coinStore.coinData.currencySymbol}
          </div>
          <div>{coinStore.coinData.currentPrice}</div>
        </div>
        <div className={coinStyle.price_change}>
          <div
            className={`${coinStyle.price_change_number} ${coinStore.priceChangeColor}`}
          >
            {coinStore.coinData.priceChange24hToString}
          </div>
          <div className={`${coinStore.priceChangeColor}`}>
            ({coinStore.coinData.priceChangePercentage24hToString})
          </div>
        </div>
      </div>
      <Chart />
      <Card
        image={coinStore.coinData.image}
        title={coinStore.coinData.name}
        subtitle={coinStore.coinData.symbol.toUpperCase()}
        className={coinStyle.coinCard}
        content={
          <div className={coinStyle.coinCard_content}>
            <div className={coinStyle.coinCard_content_price}>
              {coinStore.coinData.currencySymbol}
              {coinStore.coinData.currentPrice}
            </div>
            <div
              className={`${coinStyle.coinCard_content_percentage} ${coinStore.priceChangeColor}`}
            >
              {coinStore.coinData.priceChangePercentage24hToString}
            </div>
          </div>
        }
      />
      <div className={coinStyle.transactions}>Transactions</div>
    </div>
  );
};

export default observer(Coin);
