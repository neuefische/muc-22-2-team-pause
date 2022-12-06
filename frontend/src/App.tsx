import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import {Traveller} from "./model/User";
import AddVisitCountry from "./component/AddVisitCountry";
import useCountries from "./hook/useCountries";
import WelcomeScreen from "./component/WelcomeScreen";
import Login from "./component/Login";


function App() {
    const [loggedInUser, setLoggedInUser] = useState<Traveller>({id: "null", name: "loading", visitedCountries: []})
    const {countries} = useCountries()

    function handleLoginUser(loggedInUser: Traveller) {
        setLoggedInUser(loggedInUser)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomeScreen/>}/>
                    <Route path="/signup" element={<SignUp setLoggedInUser={handleLoginUser}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/overview" element={<UserOverview loggedInUser={loggedInUser}
                                                                   setLoggedInUser={handleLoginUser}/>}>
                    </Route>
                    <Route path="/overview/:id" element={<p>detail</p>}></Route>
                    <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                    <Route path="/overview/:id/countries" element={<AddVisitCountry
                        countries={countries}
                        loggedInUser={loggedInUser}
                    />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
