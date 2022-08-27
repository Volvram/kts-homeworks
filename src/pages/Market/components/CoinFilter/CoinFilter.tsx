import React from "react";

import { Button } from "@components/Button/Button";

import coinFilterStyle from "./CoinFilter.module.scss";

type CoinFilterProps = {
  onChange: (trend: string) => void;
};

const CoinFilter: React.FC<CoinFilterProps> = ({ onChange }) => {
  const handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    for (let i = 0; i < target.parentNode.children.length; i++) {
      if (target.parentNode.children[i] != target) {
        target.parentNode.children[i].classList.remove(
          coinFilterStyle.coin__filter_choice__clicked
        );
      }
    }

    target.classList.add(coinFilterStyle.coin__filter_choice__clicked);
    onChange(target.firstChild.data);
  };

  return (
    <div className={coinFilterStyle.coin__filter}>
      <Button
        className={`${coinFilterStyle.coin__filter_choice} ${coinFilterStyle.coin__filter_choice__clicked}`}
        onClick={handleClick}
      >
        All
      </Button>
      <Button
        className={coinFilterStyle.coin__filter_choice}
        onClick={handleClick}
      >
        Gainer
      </Button>
      <Button
        className={coinFilterStyle.coin__filter_choice}
        onClick={handleClick}
      >
        Loser
      </Button>
      <Button
        className={coinFilterStyle.coin__filter_choice}
        onClick={handleClick}
      >
        Favourites
      </Button>
    </div>
  );
};

export default CoinFilter;
