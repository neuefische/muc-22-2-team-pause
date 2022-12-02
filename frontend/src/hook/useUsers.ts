import {useEffect, useState} from "react";
import {User} from "../model/User";
import {deleteUser, getUsers, updateUser} from "../apiCalls";

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        getUsers()
            .then(data => setUsers(data))
            .catch(console.error)
    }, [])


    function deleteUserByID(id: string) {
        deleteUser(id)
            .then(() => {
                const updateUsers = users.filter((user: User) => user.id !== id)
                setUsers(updateUsers)
            }).catch(console.error)
    }

    function editUserName(id: string, newUser: User) {
        console.log(newUser)
        updateUser(id, newUser)
            .then((editedUserWithId) => {
                const updatedUsers = users.map((user) => {
                    return user.id === id ? editedUserWithId : user
                })
                setUsers(updatedUsers)
                console.log(updatedUsers)
            }).catch(console.error)
    }

    return {users, deleteUserByID, editUserName}


}