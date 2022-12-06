import {Navigate, Outlet} from "react-router-dom";
import {Traveller} from "../model/User";

type ProtectedRoutesProps={
    loggedInTraveller:Traveller | undefined;
    username:string
}

export default function ProtectedRoutes(props:ProtectedRoutesProps){

    const isAuthenticated = props.loggedInTraveller !== undefined && props.username !== ""
    return(
        isAuthenticated?<Outlet/>:<Navigate to={"/login"}/>
    )
}