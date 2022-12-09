import {Navigate, Outlet} from "react-router-dom";
import {Traveller} from "../model/User";

type ProtectedRoutesProps = {
    loggedInTraveller: Traveller;
}

export default function ProtectedRoutes(props: ProtectedRoutesProps) {

    const  isAuthenticated = props.loggedInTraveller.id !== "";
    return (
        {isAuthenticated} ? <Outlet/> : <Navigate to={"/login"}/>
    )
}