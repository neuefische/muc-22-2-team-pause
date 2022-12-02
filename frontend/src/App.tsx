import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import AddVisitCountry from "./component/AddVisitCountry";
import useCountries from "./hook/useCountries";
import {createTheme, ThemeProvider} from "@mui/material";
import WelcomeScreen from "./component/WelcomeScreen";
import Login from "./component/Login";
import useLoggedInUserAndTraveller from "./hook/useLoggedInUserAndTraveller";
import ProtectedRoutes from "./component/ProtectedRoutes";


function App() {
    const {countries} = useCountries()
    const {loggedInTraveller, loginUser, username} = useLoggedInUserAndTraveller()


    const theme = createTheme({
        palette: {
            primary: {
                main: "#f8bbd0",
                dark: "#c48b9f",
                light: "#ffeeff"
            },
            contrastThreshold: 4.5,
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div>
                <head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </head>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<WelcomeScreen/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<Login handleLogInUser={loginUser}/>}/>

                        <Route element={<ProtectedRoutes loggedInTraveller={loggedInTraveller} username={username}/>}>
                            <Route path="/overview"
                                   element={<UserOverview loggedInTraveller={loggedInTraveller}/>}></Route>
                            <Route path="/overview/:id" element={<p>detail</p>}></Route>
                            <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                            <Route path="/overview/:id/countries" element={<AddVisitCountry
                                countries={countries}
                                loggedInTraveller={loggedInTraveller}
                            />}>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>

    );

}

export default App;
