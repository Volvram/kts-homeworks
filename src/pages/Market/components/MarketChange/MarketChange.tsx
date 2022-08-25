import React, { useEffect } from "react";

import axios from "axios";

import "./MarketChange.scss";

type MarketChangeProps = {
  currency?: string;
};

const MarketChange: React.FC<MarketChangeProps> = ({ currency = "usd" }) => {
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    let sumPercentage: number = 0;

    const fetch = async (): Promise<number> => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,
      });

      result.data.map((coin: any) => {
        sumPercentage += coin.price_change_percentage_24h;
      });

      sumPercentage = sumPercentage / result.data.length;

      return new Promise((resolve, reject) => {
        resolve(sumPercentage);
      });
    };

    fetch().then((response) => {
      setSum(response);
    });
  }, []);

  const handleMarketChange = () => {
    let marketTrend: string = "";
    let marketColor: string = " neutral";
    let marketPercentage: string = `${sum.toFixed(2)}%`;

    if (sum > 0) {
      marketTrend = "up";
      marketColor = " positive";
      marketPercentage = `+${sum.toFixed(2)}%`;
    } else if (sum < 0) {
      marketTrend = "down";
      marketColor = " neutral";
    }

    return {
      trend: marketTrend,
      color: marketColor,
      percentage: marketPercentage,
    };
  };

  const marketChange = handleMarketChange();

  return (
    <div>
      <div className="market-change">
        <div>Market is {marketChange.trend}</div>
        <div className={marketChange.color}>{marketChange.percentage}</div>
      </div>
      <div className="market-change-period">In the past 24 hours</div>
    </div>
  );
};

export default MarketChange;
