import {User} from "../model/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: User[]
    loggedInUser:User
    handleDeleteUser(id:string):void
    handleLoginAs(user:User): void;
    handleEditUser(id:string, userToEdit: User):void
}

export default function UserList(props: UserListProps) {

    function handleLogInAs(user: User) {
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