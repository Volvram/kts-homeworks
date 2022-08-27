import React from "react"; //CreateContext для работы с Context API

import { Option } from "@components/Dropdown/Dropdown";
import Coin from "@pages/Coin/Coin";
import Market from "@pages/Market/Market";
import { Routes, Route, Navigate } from "react-router-dom"; //yarn add react-router-dom@6

import "./App.scss";

const App: React.FC = () => {
  const [coinCurrency, setCoinCurrency] = React.useState<Option>({
    key: "USD",
    value: "$",
  });

  const handleCurrency = (currency: Option) => {
    setCoinCurrency(currency);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Market
              onCurrencyChange={(currency: Option) => {
                handleCurrency(currency);
              }}
            />
          }
        />
        <Route path="/coin">
          <Route path=":id" element={<Coin currency={coinCurrency} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
