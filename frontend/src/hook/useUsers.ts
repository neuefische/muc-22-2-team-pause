import {useEffect, useState} from "react";
import {NewUser, User} from "../model/User";
import {addUser, deleteUser, getUsers} from "../ApiCalls";

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
            .then(newTodoResponse => {
                setUsers(prevTodoList => {
                    return [...prevTodoList, newTodoResponse.data]
                })
            }).catch(console.error)
    }

    function deleteTodoByID(id:string){
        deleteUser(id)
            .then(() => {
                const updateUsers = users.filter((user: User) => user.id !== id)
                setUsers(updateUsers)
            }).catch(console.error)
    }

    return {users, addNewUser,deleteTodoByID}
}