import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";    //yarn add react-router-dom@6

import Users from "./Users";
import User from "./User";
import Header from "./Components/Header";

const App = () => {
    const location = useLocation();

    React.useEffect(() => {
        console.log("Страница поменялась!");
    }, [location]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/user" >
                    <Route path=":id" element={<User />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;