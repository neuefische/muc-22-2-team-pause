import {Navigate, Outlet} from "react-router-dom";
import {Traveller} from "../model/User";
import {getLoggedInTravellerByLoggedInUser} from "../apiCalls";
import {useEffect, useState} from "react";

type ProtectedRoutesProps = {
    loggedInTraveller: Traveller;
}

export default function ProtectedRoutes(props: ProtectedRoutesProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(()=>{
        getLoggedInTravellerByLoggedInUser().then(data => {
            console.log(data)
            setIsAuthenticated(true)
        }).catch(() => {
            setIsAuthenticated(false)
        })
    },[])

    return (
        {isAuthenticated} ? <Outlet/> : <Navigate to={"/login"}/>
    )
}