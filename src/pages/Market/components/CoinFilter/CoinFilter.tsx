import React from "react";

import { Button } from "@components/Button/Button";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import { useSearchParams } from "react-router-dom";

import coinFilterStyle from "./CoinFilter.module.scss";

type CoinFilterProps = {
  // onChange: (trend: string) => void;
};

const CoinFilter: React.FC<CoinFilterProps> = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    const target: any = e.target;

    searchParams.set("coinTrend", target.firstChild.data);
    setSearchParams(searchParams);

    for (let i = 0; i < target.parentNode.children.length; i++) {
      if (target.parentNode.children[i] !== target) {
        target.parentNode.children[i].classList.remove(
          coinFilterStyle.coin__filter_choice__clicked
        );
      }
    }

    target.classList.add(coinFilterStyle.coin__filter_choice__clicked);
  }, []);

  return (
    <div className={coinFilterStyle.coin__filter}>
      {Object.values(CoinCategories)
        .filter((value) => isNaN(Number(value)))
        .map((category, index) => {
          let defaultClass: string = `${coinFilterStyle.coin__filter_choice}`;
          defaultClass =
            index === 0
              ? defaultClass +
                ` ${coinFilterStyle.coin__filter_choice__clicked}`
              : defaultClass;

          return (
            <Button
              key={category}
              className={defaultClass}
              onClick={handleClick}
            >
              {category}
            </Button>
          );
        })}
    </div>
  );
};

export default CoinFilter;
