import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {Traveller} from "../model/User";
import {NavigateFunction, useNavigate} from "react-router-dom";

type UserOverviewProps = {
    loggedInTraveller: Traveller
    searchText:string

}

export default function UserOverview(props: UserOverviewProps) {
    const {users, deleteUserByID, editTravellerName} = useUsers()



    function handleDeleteUser(id: string) {
        deleteUserByID(id)
    }

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(props.searchText.toLowerCase())
            || user.visitedCountries.filter(country => {
                return country.name.toLowerCase().includes(props.searchText.toLowerCase())
                    || country.threeLetterCode.toLowerCase().includes(props.searchText.toLowerCase())
            }).length > 0
    })



    function handleEditTravellerName(id: string, user: Traveller) {

        editTravellerName(id, user)
    }


    function openMap() {
        navigate("/overview/map")
    }

    return (<div>
        <UserList
            users={filteredUsers}
            handleDeleteUser={handleDeleteUser}
            handleEditTravellerName={handleEditTravellerName}
            loggedInUser={props.loggedInTraveller}/>
        Logged in as : {props.loggedInTraveller && props.loggedInTraveller.name}
        <button onClick={openMap}>map </button>
    </div>)
}