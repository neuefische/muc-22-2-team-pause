import {User} from "../model/User";
import UserCard from "./UserCard";
import {ChangeEvent, useState} from "react";

type UserListProps = {
    users: User[]
    loggedInUser:User
    handleDeleteUser(id:string):void
    handleLoginAs(user:User): void;
    handleEditUser(id:string, userToEdit: User):void
}

export default function UserList(props: UserListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    function handleLogInAs(user: User) {
        props.handleLoginAs(user)
    }

    const filteredUsers = props.users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase())
            || user.visitedCountries.every(country => {
                return country.name.toLowerCase().includes(searchQuery.toLowerCase())
                    || country.threeLetterCode.toLowerCase().includes(searchQuery.toLowerCase())
            })
    })

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value)
    }

    return (
        <div>
            <div>
                <input type={"search"} onChange={handleSearchText} placeholder={"Search for user or countries.."}/>
            </div>

            {filteredUsers.map(user => <UserCard
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