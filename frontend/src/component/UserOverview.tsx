import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {User} from "../model/User";

type UserOverviewProps = {
    loggedInUser:User
    setLoggedInUser(user: User): void;
}
export default function UserOverview(props:UserOverviewProps) {
    const {users, deleteUserByID} = useUsers()

    function handleLoginAs(user:User) {
        props.setLoggedInUser(user)
    }

    function handleDeleteUser(id:string){
        deleteUserByID(id)
    }

    return (<div>
        <UserList users={users} handleLoginAs={handleLoginAs} deleteUser={handleDeleteUser} loggedInUser={props.loggedInUser}/>
        Logged in as : {props.loggedInUser && props.loggedInUser.name}
    </div>)
}