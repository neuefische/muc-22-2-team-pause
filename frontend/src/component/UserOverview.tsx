import UserList from "./UserList";
import useUsers from "../hook/useUsers";
import {User} from "../model/User";
import {ChangeEvent, useState} from "react";

type UserOverviewProps = {
    loggedInUser: User
    setLoggedInUser(user: User): void;
}

export default function UserOverview(props: UserOverviewProps) {
    const {users, deleteUserByID, editUserName} = useUsers()

    const [searchQuery, setSearchQuery] = useState("")

    function handleLoginAs(user: User) {
        props.setLoggedInUser(user)
    }

    function handleDeleteUser(id: string) {
        deleteUserByID(id)
    }

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase())
            || user.visitedCountries.every(country => {
                return country.name.toLowerCase().includes(searchQuery.toLowerCase())
                    || country.threeLetterCode.toLowerCase().includes(searchQuery.toLowerCase())
            })
    })

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value)
    }
    function handleEditUserName(id: string, user: User) {
        props.setLoggedInUser(user)
        editUserName(id,user)
    }


    return (<div>
        <div>
            <input type={"search"} onChange={handleSearchText} placeholder={"Search for user or countries.."}/>
        </div>
        <UserList
            users={filteredUsers}
            handleLoginAs={handleLoginAs}
            handleDeleteUser={handleDeleteUser}
            handleEditUser={handleEditUserName}
            loggedInUser={props.loggedInUser}/>
        Logged in as : {props.loggedInUser && props.loggedInUser.name}
    </div>)
}