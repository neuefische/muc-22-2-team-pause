import {Navigate, Outlet} from "react-router-dom";
import {Traveller} from "../model/User";

type ProtectedRoutesProps = {
    loggedInTraveller: Traveller;
    username: string
}

export default function ProtectedRoutes(props: ProtectedRoutesProps) {

    const isAuthenticated = props.loggedInTraveller.id !== "" &&
        (props.username !== "" && props.username !== "anonymousUser")

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}