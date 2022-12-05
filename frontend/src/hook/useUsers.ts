import {useEffect, useState} from "react";
import {Traveller} from "../model/User";
import {deleteUser, getTravellers, updateUser} from "../apiCalls";

export default function useUsers() {
    const [travellers, setTravellers] = useState<Traveller[]>([])
    useEffect(() => {
        getTravellers()
            .then(data => setTravellers(data))
            .catch(console.error)
    }, [])


    function deleteUserByID(id: string) {
        deleteUser(id)
            .then(() => {
                const updateUsers = travellers.filter((user: Traveller) => user.id !== id)
                setTravellers(updateUsers)
            }).catch(console.error)
    }

    function editUserName(id: string, newUser: Traveller) {
        updateUser(id, newUser)
            .then((editedUserWithId) => {
                const updatedUsers = travellers.map((user) => {
                    return user.id === id ? editedUserWithId : user
                })
                setTravellers(updatedUsers)
            }).catch(console.error)
    }

    return {users: travellers, deleteUserByID, editUserName}


}