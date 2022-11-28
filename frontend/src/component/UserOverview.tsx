import UserList from "./UserList";
import useUsers from "../hooks/useUsers";
import {User} from "../model/User";

type UserOverviewProps = {
    loggedInUser:User
    setLoggedInUser(user: User): void;
}
export default function UserOverview(props:UserOverviewProps) {
    const {users} = useUsers()

    function handleLoginAs(user:User) {
        props.setLoggedInUser(user)
    }

    return (<div>
        <UserList users={users} handleLoginAs={handleLoginAs}/>
        Logged in as : {props.loggedInUser && props.loggedInUser.name}
    </div>)
}