import React from "react";

import Dropdown from "@components/Dropdown";
import { Option } from "@components/Dropdown/Dropdown";
import CurrencyFilterStore from "@store/CurrencyFilterStore/CurrencyFilterStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styleCurrencyFilter from "./CurrencyFilter.module.scss";

const CurrencyFilter: React.FC = () => {
  const currencyFilterStore = useLocalStore(() => new CurrencyFilterStore());

  return (
    <div className={styleCurrencyFilter.currencyFilter}>
      <div className={styleCurrencyFilter.coinsHeader}>Coins</div>
      <Dropdown
        options={currencyFilterStore.currencies}
        defaultValue={currencyFilterStore.currency}
        onChange={(currency: Option) => {
          currencyFilterStore.setCurrency(currency);
        }}
        description={currencyFilterStore.description}
        defaultOptionDescription={currencyFilterStore.defaultOptionDescription}
      ></Dropdown>
    </div>
  );
};

export default observer(CurrencyFilter);
