import {User} from "../model/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: User[]
}

export default function UserList(props: UserListProps) {


    return (
        <div>
            {props.users.map(user => <UserCard key={user.id} user={user}/>)}
        </div>
    )
}