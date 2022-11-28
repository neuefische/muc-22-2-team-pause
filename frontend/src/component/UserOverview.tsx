import UserList from "./UserList";
import useUsers from "../hooks/useUsers";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "../model/User";


export default function UserOverview() {
    const {users} = useUsers()
    const {state} = useLocation()
    const [loggedInUser, setLoggedInUser] = useState<User>()

    useEffect(() => {
        setLoggedInUser(state)
    }, [])

    function handleLoginAs(user:User) {
        setLoggedInUser(user)
    }

    return (<div>
        <UserList users={users} handleLoginAs={handleLoginAs}/>
        Logged in as : {loggedInUser && loggedInUser.name}
    </div>)
}