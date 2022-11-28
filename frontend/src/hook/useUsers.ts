import {useEffect, useState} from "react";
import { User} from "../model/User";
import { deleteUser, getUsers} from "../apiCalls";

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
            getUsers()
                .then(data => setUsers(data))
                .catch(console.error)
        }, []
    )


    function deleteUserByID(id:string){
        deleteUser(id)
            .then(() => {
                const updateUsers = users.filter((user: User) => user.id !== id)
                setUsers(updateUsers)
            }).catch(console.error)
    }

    return {users, deleteUserByID}
}