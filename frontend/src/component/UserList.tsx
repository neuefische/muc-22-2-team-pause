import {User} from "../model/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: User[]
    deleteUser(id:string):void
    handleLoginAs(user:User): void;
}

export default function UserList(props: UserListProps) {


    function handleLogInAs(user:User) {
        props.handleLoginAs(user)
    }

    return (
        <div>
            {props.users.map(user => <UserCard key={user.id} user={user} handleLoginAs={handleLogInAs} deleteUser={props.deleteUser}/>)}
        </div>
    )
}