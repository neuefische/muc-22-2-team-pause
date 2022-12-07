import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {Traveller} from "../model/User";
import {ChangeEvent, useState} from "react";

type UserOverviewProps = {
    loggedInTraveller: Traveller

}

export default function UserOverview(props: UserOverviewProps) {
    const {users, deleteUserByID, editTravellerName} = useUsers()

    const [searchQuery, setSearchQuery] = useState("")



    function handleDeleteUser(id: string) {
        deleteUserByID(id)
    }

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase())
            || user.visitedCountries.filter(country => {
                return country.name.toLowerCase().includes(searchQuery.toLowerCase())
                    || country.threeLetterCode.toLowerCase().includes(searchQuery.toLowerCase())
            }).length > 0
    })

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value)
    }

    function handleEditTravellerName(id: string, user: Traveller) {

        editTravellerName(id, user)
    }


    return (<div>
        <div>
            <input type={"search"} onChange={handleSearchText} value={searchQuery} placeholder={"Search for user or countries.."}/>
        </div>
        <UserList
            users={filteredUsers}

            handleDeleteUser={handleDeleteUser}
            handleEditTravellerName={handleEditTravellerName}
            loggedInUser={props.loggedInTraveller}/>
        Logged in as : {props.loggedInTraveller && props.loggedInTraveller.name}
    </div>)
}