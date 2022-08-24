import React from "react";
import './UserItem.css';

const UserItem = ({user}) => {
    return<div className="item">
        <div className="item__avatar" style={{
            backgroundImage: `url(${user.avatarUrl})`
        }} />
        <div className="item__login">{user.login}</div>
    </div>
}

export default UserItem;