import React from "react";

import Dropdown from "@components/Dropdown";
import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";

import styleCurrencyFilter from "./CurrencyFilter.module.scss";

type CurrencyFilterProps = {
  onChange: (value: Option) => void;
  defaultCurrency: Option | null;
};

const CurrencyFilter: React.FC<CurrencyFilterProps> = ({
  onChange,
  defaultCurrency,
}) => {
  const description: string = "Market-";

  return (
    <div className={styleCurrencyFilter.currencyFilter}>
      <div className={styleCurrencyFilter.coinsHeader}>Coins</div>
      <Dropdown
        options={CURRENCIES}
        defaultValue={defaultCurrency}
        onChange={onChange}
        description={description}
        defaultOptionDescription="INR"
      ></Dropdown>
    </div>
  );
};

export default CurrencyFilter;
