import {useEffect, useState} from "react";
import {User} from "../model/User";
import {getUsers} from "../ApiCalls";

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
            getUsers()
                .then(data => setUsers(data))
                .catch(console.error)
        }, []
    )

    return {users}
}