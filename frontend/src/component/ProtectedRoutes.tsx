import {Navigate, Outlet} from "react-router-dom";
import {Traveller} from "../model/User";

type ProtectedRoutesProps={
    loggedInTraveller:Traveller | undefined;
}

export default function ProtectedRoutes(props:ProtectedRoutesProps){

    const isAuthenticated = props.loggedInTraveller !== undefined
    return(
        isAuthenticated?<Outlet/>:<Navigate to={"/login"}/>
    )
}