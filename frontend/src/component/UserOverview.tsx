import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {Country} from "../model/Country";
import {Traveller} from "../model/User";

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
            || user.visitedCountries.filter((country:Country) => {
                return country.name.toLowerCase().includes(props.searchText.toLowerCase())
                    || country.threeLetterCode.toLowerCase().includes(props.searchText.toLowerCase())
            }).length > 0
    })



    function handleEditTravellerName(id: string, user: Traveller) {

        editTravellerName(id, user)
    }

    return (<div>
        <UserList
            travellers={filteredUsers}
            handleDeleteUser={handleDeleteUser}
            handleEditTravellerName={handleEditTravellerName}
            loggedInUser={props.loggedInTraveller}/>
        Logged in as : {props.loggedInTraveller && props.loggedInTraveller.name}
    </div>)
}