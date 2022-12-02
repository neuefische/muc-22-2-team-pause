import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import AddVisitCountry from "./component/AddVisitCountry";
import useCountries from "./hook/useCountries";
import WelcomeScreen from "./component/WelcomeScreen";
import Login from "./component/Login";
import useLoggedInUserAndTraveller from "./hook/useLoggedInUserAndTraveller";
import ProtectedRoutes from "./component/ProtectedRoutes";


function App() {

    const {countries} = useCountries()
    const {loggedInTraveller, loginUser, username} = useLoggedInUserAndTraveller()


    return (
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
                    <Route path="/login" element={<Login handleLogInUser={loginUser} />}/>

                    <Route element={<ProtectedRoutes loggedInTraveller={loggedInTraveller} username={username}/>}>
                        <Route path="/overview" element={<UserOverview loggedInTraveller={loggedInTraveller}/>}></Route>
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
    );

}

export default App;
