import React from "react";

import { Dropdown } from "@components/Dropdown/Dropdown";
import { Option } from "@components/Dropdown/Dropdown";

import "./CurrencyFilter.scss";

type CurrencyFilterProps = {
  onChange: (value: Option) => void;
};

const CurrencyFilter: React.FC<CurrencyFilterProps> = ({ onChange }) => {
  const currencies: Option[] = [
    {
      key: "USD",
      value: "$",
    },
    {
      key: "EUR",
      value: "€",
    },
    {
      key: "RUB",
      value: "₽",
    },
  ];

  const defaultCurrency: Option = currencies[0];

  const description: string = "Market-";

  return (
    <div className="currency-filter">
      <div className="coins-header">Coins</div>
      <Dropdown
        options={currencies}
        defaultValue={defaultCurrency}
        onChange={onChange}
        description={description}
      ></Dropdown>
    </div>
  );
};

export default CurrencyFilter;
