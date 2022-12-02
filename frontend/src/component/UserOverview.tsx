import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {User} from "../model/User";

type UserOverviewProps = {
    loggedInUser: User
    setLoggedInUser(user: User): void;
}

export default function UserOverview(props: UserOverviewProps) {
    const {users, deleteUserByID, editUserName} = useUsers()

    function handleLoginAs(user: User) {
        props.setLoggedInUser(user)
    }

    function handleDeleteUser(id: string) {
        deleteUserByID(id)
    }

    function handleEditUserName(id: string, user: User) {
        props.setLoggedInUser(user)
        editUserName(id,user)
    }


    return (<div>
        <UserList
            users={users}
            handleLoginAs={handleLoginAs}
            deleteUser={handleDeleteUser}
            editUser={handleEditUserName}
            loggedInUser={props.loggedInUser}/>
        Logged in as : {props.loggedInUser && props.loggedInUser.name}
    </div>)
}