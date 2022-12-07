import {Traveller} from "../model/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: Traveller[]
    loggedInUser:Traveller
    handleDeleteUser(id:string):void

    handleEditTravellerName(id:string, userToEdit: Traveller):void
}

export default function UserList(props: UserListProps) {



    return (
        <div>
            {props.users.map(user => <UserCard
                key={user.id}
                user={user}

                loggedInUser={props.loggedInUser}
                handleDeleteUser={props.handleDeleteUser}
                handleEditUser={props.handleEditTravellerName}
            />)}
        </div>
    )
}