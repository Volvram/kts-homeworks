import React from "react";

import { Card } from "@components/Card/Card";
import { Option } from "@components/Dropdown/Dropdown";
import axios from "axios"; //yarn add axios
import { Link } from "react-router-dom";

import "./CoinList.scss";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: string;
  priceChangePercentage24hr: string;
};

type CoinListProps = {
  currency: Option;
  coinTrend: string;
};

const CoinList: React.FC<CoinListProps> = ({ currency, coinTrend }) => {
  const [coins, setCoins] = React.useState<Coin[]>([]);

  React.useEffect(() => {
    // При изменении валюты или фильтра монет

    // Запрашиваем монеты
    const fetch = async (): Promise<void> => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.key.toLowerCase()}`,
      });

      let currencySign: string = currency.value;

      setCoins(
        result.data
          .filter((coin: any) => {
            if (coinTrend === "Gainer") {
              return coin.price_change_percentage_24h > 0;
            } else if (coinTrend === "Loser") {
              return coin.price_change_percentage_24h < 0;
            } else {
              return true;
            }
          })
          .map((coin: any) => {
            let priceChange: string = "";

            if (coin.price_change_percentage_24h > 0) {
              priceChange = `+${coin.price_change_percentage_24h.toFixed(2)}%`;
            } else if (coin.price_change_percentage_24h <= 0) {
              priceChange = `${coin.price_change_percentage_24h.toFixed(2)}%`;
            }

            return {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol.toUpperCase(),
              image: coin.image,
              currentPrice: `${currencySign} ${coin.current_price.toFixed(2)}`,
              priceChangePercentage24hr: priceChange,
            };
          })
      );
    };

    fetch();
  }, [currency, coinTrend]);

  return (
    <div className="coin-list">
      {coins.map((coin) => {
        const coinPriceChange: string = coin.priceChangePercentage24hr;

        let coinPricePercentage: string = "coin_change-percentage-24hr";

        if (coinPriceChange.startsWith("+")) {
          coinPricePercentage += " positive";
        } else if (coinPriceChange.startsWith("-")) {
          coinPricePercentage += " negative";
        } else {
          coinPricePercentage += " neutral";
        }

        return (
          <Link
            to={`/coin/${coin.id}`}
            key={coin.id}
            style={{
              textDecoration: "none",
              marginTop: "8px",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <Card
              image={coin.image}
              title={coin.name}
              subtitle={coin.symbol}
              className="coin"
              content={
                <div className="coin_chart-and-price-and-change-percentage-24hr">
                  <div
                    className="coin_chart"
                    style={{ width: "50px", height: "25px" }}
                  ></div>
                  <div className="coin_price-and-change-percentage-24hr">
                    <div className="coin_price">{coin.currentPrice}</div>
                    <div className={coinPricePercentage}>
                      {coin.priceChangePercentage24hr}
                    </div>
                  </div>
                </div>
              }
            ></Card>
          </Link>
        );
      })}
    </div>
  );
};

export default CoinList;