import React from "react";

import { Link } from "react-router-dom";

const Coin = () => {
  return (
    <div>
      <div>Это страница Coin, она ещё в разработке</div>
      <Link to={`/`}>Перейти на страницу Market</Link>
    </div>
  );
};

export default Coin;
