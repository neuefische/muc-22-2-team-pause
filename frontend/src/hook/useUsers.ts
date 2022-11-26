import {useEffect, useState} from "react";
import {NewUser, User} from "../model/User";
import {addUser, getUsers} from "../ApiCalls";

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
            getUsers()
                .then(response => response.data)
                .then(data => setUsers(data))
                .catch(console.error)
        }, []
    )

    function addNewUser(newUser: NewUser) {
        addUser(newUser)
            .then(response => response.data)
            .then(data => {
                    users.push(data)
                    setUsers(users)
                }
            ).catch(console.error)
    }


    return {users, addNewUser}
}