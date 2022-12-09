import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import AddVisitCountry from "./component/AddVisitCountry";
import {createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./mui-theme";
import WelcomeScreen from "./component/WelcomeScreen";
import Login from "./component/Login";
import useLoggedInUserAndTraveller from "./hook/useLoggedInUserAndTraveller";
import ProtectedRoutes from "./component/ProtectedRoutes";
import NavBar from "./component/NavBar";


function App() {
    const {loggedInTraveller, loginUser, username} = useLoggedInUserAndTraveller()
    const theme = createTheme(themeOptions)

    const [searchText, setSearchText] = useState<string>("")
    function handleCallback(text:string){
        setSearchText(text)
    }

    return (
        <ThemeProvider theme={theme}>
            <head>
                <title>
                    Visited Countries
                </title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </head>

                <BrowserRouter>
                    <NavBar username={username} handleSearch={handleCallback}/>
                    <Routes>
                        <Route path="/" element={<WelcomeScreen/>}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/login" element={<Login handleLogInUser={loginUser}/>}/>

                        <Route element={<ProtectedRoutes loggedInTraveller={loggedInTraveller} username={username}/>}>
                            <Route path="/overview"
                                   element={<UserOverview searchText={searchText} loggedInTraveller={loggedInTraveller}/>}></Route>
                            <Route path="/overview/:id" element={<p>detail</p>}></Route>
                            <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                            <Route path="/overview/:id/countries" element={<AddVisitCountry
                                loggedInTraveller={loggedInTraveller}
                            />}>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
        </ThemeProvider>

    );

}

export default App;
