import React from "react"; //CreateContext для работы с Context API

import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import Coin from "@pages/Coin/Coin";
import Market from "@pages/Market/Market";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom"; //yarn add react-router-dom@6

import "./App.scss";

const App: React.FC = () => {
  const [coinCurrency, setCoinCurrency] = React.useState<Option | null>(null);

  const handleCurrency = React.useCallback((currency: Option) => {
    setCoinCurrency(currency);
  }, []);

  React.useEffect(() => {
    const savedCurrency: string | null =
      window.localStorage.getItem("currency");

    if (typeof savedCurrency === "string") {
      setCoinCurrency(JSON.parse(savedCurrency));
    } else {
      setCoinCurrency(CURRENCIES[0]);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Market />} />

        <Route path="/coin">
          <Route path=":id" element={<Coin currency={coinCurrency} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default observer(App);
