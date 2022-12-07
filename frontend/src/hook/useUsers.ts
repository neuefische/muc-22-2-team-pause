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
            .then(handleUpdate)
            .catch(console.error)
    }

    function handleUpdate(editedUserWithId: Traveller) {
        const updatedUsers = travellers.map((user) => {
            return user.id === editedUserWithId.id ? editedUserWithId : user
        })
        setTravellers(updatedUsers)
    }

    return {users: travellers, deleteUserByID, editTravellerName: editUserName}
}
