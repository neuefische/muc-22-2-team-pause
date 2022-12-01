import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";
import {User} from "./model/User";
import MapSVG from "./component/MapSVG";


function App() {
    const [loggedInUser, setLoggedInUser] = useState<User>({id:"null",name:"loading",visitedCountries:[]})

    function handleLoginUser(loggedInUser:User) {
        setLoggedInUser(loggedInUser)
    }

    return (



        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp setLoggedInUser={handleLoginUser}/>}/>
                    <Route path="/overview" element={<UserOverview loggedInUser={loggedInUser}
                                                                   setLoggedInUser={handleLoginUser} />}>

                    </Route>
                    <Route path="/overview/:id" element={<p>detail</p>}></Route>
                    <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                    <Route path="/overview/:id/countries" element={<p>edit countries</p>}></Route>
                    <Route path="/overview/map" element={<MapSVG loggedInUser={loggedInUser}/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );




}

export default App;
