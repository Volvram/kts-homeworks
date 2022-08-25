import React from "react"; //CreateContext для работы с Context API

import Coin from "@pages/Coin/Coin";
import Market from "@pages/Market/Market";
import axios from "axios"; //yarn add axios
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; //yarn add react-router-dom@6

import "./App.scss";

const App = () => {
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
