import UserList from "./UserList";
import useUsers from "../hooks/useUsers";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "../model/User";

export default function UserOverview (){
    const {users} =useUsers()
    const {state} = useLocation();
    const [loggedInUser, setLoggedInUser] = useState<User>();

    useEffect(()=> {
        setLoggedInUser(state)
    },[state])

    return(<div>
        <UserList users={users}/>
    </div>)
}