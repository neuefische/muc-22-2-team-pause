import {Traveller} from "../model/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: Traveller[]
    loggedInUser:Traveller
    handleDeleteUser(id:string):void
    handleLoginAs(user:Traveller): void;
    handleEditUser(id:string, userToEdit: Traveller):void
}

export default function UserList(props: UserListProps) {

    function handleLogInAs(user: Traveller) {
        props.handleLoginAs(user)
    }

    return (
        <div>
            {props.users.map(user => <UserCard
                key={user.id}
                user={user}
                handleLoginAs={handleLogInAs}
                loggedInUser={props.loggedInUser}
                handleDeleteUser={props.handleDeleteUser}
                handleEditUser={props.handleEditUser}
            />)}
        </div>
    )
}