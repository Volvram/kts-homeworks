import React from "react";

import { Button } from "@components/Button/Button";

import coinFilterStyle from "./CoinFilter.module.scss";

type CoinFilterProps = {
  onChange: (trend: string) => void;
};

const CoinFilter: React.FC<CoinFilterProps> = ({ onChange }) => {
  const coinTrends = ["All", "Gainer", "Loser", "Favourites"];

  const handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    for (let i = 0; i < target.parentNode.children.length; i++) {
      if (target.parentNode.children[i] != target) {
        target.parentNode.children[i].classList.remove(
          coinFilterStyle.coin__filter_choice__clicked
        );
      }

      // eslint-disable-next-line no-console
      console.log(target.parentNode.children[i]);
    }

    if (
      target.classList.contains(coinFilterStyle.coin__filter_choice__clicked)
    ) {
      onChange(coinTrends[0]);
      target.classList.remove(coinFilterStyle.coin__filter_choice__clicked);
    } else {
      target.classList.add(coinFilterStyle.coin__filter_choice__clicked);
      onChange(target.firstChild.data);
    }
  };

  return (
    <div className={coinFilterStyle.coin__filter}>
      {coinTrends.map((trend) => {
        return (
          <Button
            key={trend}
            className={coinFilterStyle.coin__filter_choice}
            onClick={handleClick}
          >
            {trend}
          </Button>
        );
      })}
    </div>
  );
};

export default CoinFilter;
