import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import AddVisitCountry from "./component/AddVisitCountry";
import useCountries from "./hook/useCountries";
import WelcomeScreen from "./component/WelcomeScreen";
import Login from "./component/Login";
import useLoggedInUser from "./hook/useLoggedInUser";
import ProtectedRoutes from "./component/ProtectedRoutes";


function App() {

    const {countries} = useCountries()
    const {loggedInTraveller, loginUser} = useLoggedInUser()


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomeScreen/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login handleLogInUser={loginUser} />}/>
                    <Route element={<ProtectedRoutes loggedInTraveller={loggedInTraveller}/>}>
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
