import React,  { createContext, useContext } from "react";  //CreateContext для работы с Context API

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";    //yarn add react-router-dom@6
import axios from "axios";     //yarn add axios

import Users from "./pages/Users/Users";
import User from "./pages/User/User";
import Header from "./components/Header";

import UserItem from "./UserItem";

// Context
// const ThemeContext = createContext({
//     theme: 'light',
//     setTheme: () => {}
// });

// const Provider = ThemeContext.Provider;

// export const useThemeContext = () => useContext(ThemeContext);

const App = () => {

    // Навигация
    const location = useLocation();

    // React.useEffect(() => {
    //     console.log("Страница поменялась!");
    // }, [location]);



    // Получение данных
    const [users, setUsers] = React.useState([]);

    // React.useEffect(() => {
    //     const fetch = async () => {
    //         const result = await axios({
    //             method: 'get',
    //             url: 'https://api.github.com/users'
    //         });

    //         setUsers(result.data.map((raw: any) => {
    //             return(
    //                 {
    //                     id: raw.id,
    //                     login: raw.login,
    //                     avatar: raw.avatar
    //                 }
    //             );
    //         }));
    //     }

    //     fetch();
    // }, []);


    // Context
    const [theme, setTheme] = React.useState('light');

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


             {/* {users.map((user:{id: number, avatarUrl: string, login: string}) => 
                <UserItem key={user.id} user={{
                    avatarUrl: '',
                    login: 'login'
                    }}
                />)
            }


            <Provider value={{
                theme,
                setTheme: () => void
            }}>

            </Provider> */}
        
        </div>
    );
};

export default App;