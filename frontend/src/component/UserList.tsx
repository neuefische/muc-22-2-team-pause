import {Traveller} from "../model/User";
import UserCard from "./UserCard";
import "./UserList.css"

type UserListProps = {
    users: Traveller[]
    loggedInUser:Traveller
    handleDeleteUser(id:string):void

    handleEditTravellerName(id:string, userToEdit: Traveller):void
}

export default function UserList(props: UserListProps) {



    return (
        <div className={"userList"}>
            {props.users.map(user => <UserCard
                key={user.id}
                loggedInTraveller={props.loggedInUser}
                handleDeleteUser={props.handleDeleteUser}
                handleEditUser={props.handleEditTravellerName}
            />)}
        </div>
    )
}