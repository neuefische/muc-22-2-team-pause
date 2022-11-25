import {useEffect, useState} from "react";
import {NewUser, User} from "../model/User";
import {addUser, getUsers} from "../ApiCalls";
import UserList from "./UserList";
import AddUser from "./AddUser";

export default function UserApp() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
            getUsers()
                .then(response => response.data)
                .then(data => setUsers(data))
                .catch(console.error)
        }, []
    )


    function creatUser(user: NewUser) {
        addUser(user)
            .then(response => response.data)
            .then(data => {
                    setUsers((prevState) => {
                        return [...prevState, data]
                    })
                }
            )
    }

    return (

        <div><UserList users={users}/>
        <AddUser creatUser={creatUser}/>
        </div>
    )


}