import React, { useContext } from "react";

// import { useThemeContext } from "./App";

import styles from "./UserItem.module.scss";
import styled, { css } from "styled-components";   // yarn add styled-components

// Styled components
const fontSize = css`
  font-size: ${props => props.large ? '32px' : '16px'}
`

const UserLogin = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-left: 24px;

   ${fontSize}
  ${/*тут тоже можно использовать:   font-size: ${props => props.large ? '32px' : '16px'}*/}
`


const UserItem = ({ user }: any) => {
  // Context
  // const themeContext = useThemeContext();
  // const theme = themeContext.theme;

  return (
    <div className="item">
      <div
        className="item__avatar"
        style={{
          backgroundImage: `url(${user.avatarUrl})`,
        }}
      />
      {/* Styled components */}
      <UserLogin large>{user.login}</UserLogin>
    </div>
  );
};

export default UserItem;
