import React from "react";

import Coin from "pages/Coin/Coin";
import Market from "pages/Market/Market";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Market />} />

        <Route path="/coin">
          <Route path=":id" element={<Coin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
