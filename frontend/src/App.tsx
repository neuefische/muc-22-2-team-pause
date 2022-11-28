import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./component/SignUp";
import UserOverview from "./component/UserOverview";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/overview" element={<UserOverview/>}></Route>
                    <Route path="/overview/:id" element={<p>detail</p>}></Route>
                    <Route path="/overview/:id/profile" element={<p>edit name</p>}></Route>
                    <Route path="/overview/:id/countries" element={<p>edit countries</p>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
