import {Traveller} from "../model/User";
import UserCard from "./UserCard";
import "./UserList.css"

type UserListProps = {
    travellers: Traveller[]
    loggedInUser:Traveller
    handleDeleteUser(id:string):void

    handleEditTravellerName(id:string, userToEdit: Traveller):void
}

export default function UserList(props: UserListProps) {



    return (
        <div className={"userList"}>
            {props.travellers.map(traveller => <UserCard
                key={traveller.id}
                traveller={traveller}
                loggedInTraveller={props.loggedInUser}
                handleDeleteUser={props.handleDeleteUser}
                handleEditUser={props.handleEditTravellerName}
            />)}
        </div>
    )
}