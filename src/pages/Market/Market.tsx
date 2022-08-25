import React from "react";

import { Link } from "react-router-dom";

const Market: React.FC = () => {
  return (
    <div>
      <div>Это страница Market</div>
      <Link to={`/coin`}>Перейти на страницу coin</Link>
    </div>
  );
};

export default Market;
