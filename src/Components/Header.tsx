import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <header>
        <Link to="/">Все пользователи</Link>
        <Link to="/user">Один пользователь</Link>
    </header>
);

export default Header;