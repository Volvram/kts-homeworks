import React, { useEffect } from "react";

import axios from "axios";

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

      return new Promise((resolve, reject) => {
        resolve(sumPercentage);
      });
    };

    fetch()
        .then((response) => {
        setSum(response);
        });
  }, []);

  //   eslint-disable-next-line no-console
  console.log(sum);

  return <div>Это MarketChange</div>;
};

export default MarketChange;
