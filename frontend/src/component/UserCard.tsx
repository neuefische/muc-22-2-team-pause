import {User} from "../model/User";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type UserCardProps = {
    user: User
    loggedInUser: User
    handleLoginAs(user: User): void
    deleteUser(id: string): void
    editUser(id: string, userToEdit: User): void
}

export default function UserCard(props: UserCardProps) {
    const navigate = useNavigate()
    const [editedUser, setEditedUser] = useState<User>(props.user)


    function handleDeleteUser() {
        props.deleteUser(props.user.id)
        navigate("/")
    }

    function handleEditName(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.editUser(props.loggedInUser.id, editedUser)
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setEditedUser(prevState => ({...prevState, [event.target.name]: event.target.value}))

    }

    function handleLoginAs() {
        props.handleLoginAs(props.user)
    }

    function handleAddCountry() {
        navigate("/overview/" + props.user.id + "/countries")
    }

    return (<div>
            <h2>Name:{props.user.name} </h2>
            <div>{props.user.visitedCountries &&
                props.user.visitedCountries.map((country) => <p
                    key={country.threeLetterCode}> {country.name}[{country.threeLetterCode}] {country.flag}</p>)}
            </div>
            {props.loggedInUser.id === props.user.id &&
                <form onSubmit={handleEditName}>
                    <label>
                        <input
                            type={"text"}
                            name={"name"}
                            value={editedUser.name}
                            onChange={handleNameChange}
                            placeholder={"name"}
                        />
                    </label>
                    <button type={"submit"}>Edit name</button>
                </form>}
            {props.loggedInUser.id === props.user.id && <button onClick={handleDeleteUser}>Delete user</button>}
            {props.loggedInUser.id === props.user.id && <button
                onClick={handleAddCountry}>
                Add country you've visited
            </button>}
            {props.loggedInUser.id !== props.user.id && < button onClick={handleLoginAs}>Login as</button>}
        </div>
    )
}
