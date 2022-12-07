import {Traveller} from "../model/User";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type UserCardProps = {
    user: Traveller
    loggedInUser: Traveller

    handleDeleteUser(id: string): void
    handleEditUser(id: string, userToEdit: Traveller): void
}

export default function UserCard(props: UserCardProps) {
    const navigate = useNavigate()
    const [changedUserName, setChangedUserName] = useState("")

    function handleDeleteUser() {
        props.handleDeleteUser(props.user.id)
        navigate("/")
    }

    function handleEditName(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.user.name = changedUserName
        props.handleEditUser(props.loggedInUser.id, props.user)
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setChangedUserName(event.target.value)
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
        </div>
    )
}
