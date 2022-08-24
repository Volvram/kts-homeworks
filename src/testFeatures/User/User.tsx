import React from "react";

import { USERS } from "src/testFeatures/users";
import { useParams } from "react-router-dom";

type User = {
  id: string;
  name: string;
};

const User = () => {
  // Получаем id из url с помощью хука useParams
  const { id } = useParams();

  const user = USERS.find((user: User) => user.id === id);

  return <div>{user && user.name}</div>;
};

export default User;
