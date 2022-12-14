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
import useCountries from "./hook/useCountries";
import WorldMap from "./component/WorldMap";
import HeatMap from "./component/HeatMap";


function App() {
    const {loggedInTraveller, loginUser, username} = useLoggedInUserAndTraveller()
    const theme = createTheme(themeOptions)

    const [searchText, setSearchText] = useState<string>("")

    const {countries} = useCountries();

    function handleCallback(text: string) {
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
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login handleLogInUser={loginUser} loggedInUsername={username}/>}/>
                    <Route path="/heatmap" element={<HeatMap countries={countries}/>}/>

                    <Route element={<ProtectedRoutes loggedInTraveller={loggedInTraveller} username={username}/>}>
                        <Route path="/overview/:username/map" element={
                            <WorldMap
                                countries={countries}
                                loggedInTraveller={loggedInTraveller}
                            />}>
                        </Route>

                        <Route path="/overview"
                               element={<UserOverview searchText={searchText}
                                                      loggedInTraveller={loggedInTraveller}/>}>
                        </Route>

                        <Route path="/overview/:id/countries" element={
                            <AddVisitCountry
                                countries={countries}
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
