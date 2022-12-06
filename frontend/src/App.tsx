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
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id: "null", name: "loading", visitedCountries: []})
    const {countries} = useCountries()

    function handleLoginTraveller(loggedInUser: Traveller) {
        setLoggedInTraveller(loggedInUser)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomeScreen/>}/>
                    <Route path="/signup" element={<SignUp setLoggedInTraveller={handleLoginTraveller}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/overview" element={<UserOverview loggedInTraveller={loggedInTraveller}
                                                                   setLoggedInTraveller={handleLoginTraveller}/>}>
                    </Route>
                    <Route path="/overview/:id" element={<p>detail</p>}></Route>
                    <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                    <Route path="/overview/:id/countries" element={<AddVisitCountry
                        countries={countries}
                        loggedInTraveller={loggedInTraveller}
                    />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
