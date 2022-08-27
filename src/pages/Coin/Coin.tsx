import React from "react";

import { Button } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { Option } from "@components/Dropdown/Dropdown";
import axios from "axios";
import { useParams } from "react-router-dom";

import coinStyle from "./Coin.module.scss";
import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";

type CoinProps = {
  currency: Option;
};

export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  currency: string;
  priceChange24h: number;
  priceChangePercentage24h: number;
};

const Coin: React.FC<CoinProps> = ({ currency }) => {
  const { id } = useParams();

  const [coinData, setCoinData] = React.useState<CoinData>({
    id: "",
    name: "",
    symbol: "",
    image: "",
    currentPrice: 0,
    currency: "",
    priceChange24h: 0,
    priceChangePercentage24h: 0,
  });

  React.useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
      });

      setCoinData({
        id: result.data.id,
        name: result.data.name,
        symbol: result.data.symbol,
        image: result.data.image.large,
        currentPrice:
          result.data.market_data.current_price[
            currency.key.toLowerCase()
          ].toFixed(2),
        currency: currency.value,
        priceChange24h:
          result.data.market_data.price_change_24h_in_currency[
            currency.key.toLowerCase()
          ].toFixed(3),
        priceChangePercentage24h:
          result.data.market_data.price_change_percentage_24h_in_currency[
            currency.key.toLowerCase()
          ].toFixed(2),
      });

      // eslint-disable-next-line no-console
      console.log(result.data.market_data);
    };

    fetch();
  }, [currency]);

  // Обработка текущих изменений
  let priceChange24h: string = `${coinData.priceChange24h}`;
  let priceChangePercentage24h: string = `${coinData.priceChangePercentage24h}%`;
  let priceChangeColor: string = "neutral";

  if (coinData.priceChange24h > 0) {
    priceChange24h = `+ ${coinData.priceChange24h}`;
    priceChangePercentage24h = `${coinData.priceChangePercentage24h}%`;
    priceChangeColor = "positive";
  } else if (coinData.priceChange24h < 0) {
    priceChange24h = `- ${-coinData.priceChange24h}`;
    priceChangePercentage24h = `${-coinData.priceChangePercentage24h}%`;
    priceChangeColor = "negative";
  }

  return (
    <div className={coinStyle.coinPage}>
      <Header coinData={coinData} />
      <div className={coinStyle.price}>
        <div className={coinStyle.price_current}>
          <div className={coinStyle.price_current_currency}>
            {coinData.currency}
          </div>
          <div>{coinData.currentPrice}</div>
        </div>
        <div className={coinStyle.price_change}>
          <div
            className={`${coinStyle.price_change_number} ${priceChangeColor}`}
          >
            {priceChange24h}
          </div>
          <div className={`${priceChangeColor}`}>
            ({priceChangePercentage24h})
          </div>
        </div>
      </div>
      <Chart />
      <Card
        image={coinData.image}
        title={coinData.name}
        subtitle={coinData.symbol.toUpperCase()}
        className={coinStyle.coinCard}
        content={
          <div className={coinStyle.coinCard_content}>
            <div className={coinStyle.coinCard_content_price}>
              {coinData.currency}
              {coinData.currentPrice}
            </div>
            <div
              className={`${coinStyle.coinCard_content_percentage} ${priceChangeColor}`}
            >
              {priceChangePercentage24h}
            </div>
          </div>
        }
      />
      <div className={coinStyle.transactions}>Transactions</div>
    </div>
  );
};

export default Coin;
