import React, { useContext } from "react";

// import { useThemeContext } from "./App";

import './UserItem.css';

const UserItem = ({user}:any) => {

    // Context
    // const themeContext = useThemeContext();
    // const theme = themeContext.theme;

    return<div className="item">
        <div className="item__avatar" style={{
            backgroundImage: `url(${user.avatarUrl})`
        }} />
        <div className="item__login">{user.login}</div>
    </div>
}

export default UserItem;