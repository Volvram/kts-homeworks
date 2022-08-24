import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";    //yarn add react-router-dom@6
import axios from "axios";     //yarn add axios

import Users from "./pages/Users/Users";
import User from "./pages/User/User";
import Header from "./components/Header";

import UserItem from "./UserItem";

const App = () => {

    // Навигация
    const location = useLocation();

    React.useEffect(() => {
        console.log("Страница поменялась!");
    }, [location]);

    // Получение данных
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://api.github.com/users'
            });

            setUsers(result.data.map((raw: any) => {
                return(
                    {
                        id: raw.id,
                        login: raw.login,
                        avatar: raw.avatar
                    }
                );
            }));
        }

        fetch();
    }, []);

    return (
        <div className="App">
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

            {users.map((user:{id: number, avatarUrl: string, login: string}) => 
                <UserItem key={user.id} user={{
                    avatarUrl: '',
                    login: 'login'
                    }}
                />)
            }
        
        </div>
        
    );
};

export default App;