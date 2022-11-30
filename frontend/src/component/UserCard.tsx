import {User} from "../model/User";
import React from "react";
import {useNavigate} from "react-router-dom";

type UserCardProps = {
    user: User
    loggedInUser: User
    handleLoginAs(user: User): void;
    deleteUser(id: string): void
}

export default function UserCard(props: UserCardProps) {
    const navigate = useNavigate()

    function handleDeleteUser() {
        props.deleteUser(props.user.id)
        navigate("/")
    }

    function handleLoginAs() {
        props.handleLoginAs(props.user)
    }

    function handleAddCountry() {
        navigate("/overview/"+props.user.id+"/countries")
    }

    return (<div>
            <h2>Name:{props.user.name} </h2>
            <div>{props.user.visitedCountries &&
                props.user.visitedCountries.map((c) => {return <p key={c.threeLetterCode}> {c.name}</p>})}
            </div>
            {props.loggedInUser.id === props.user.id && <button onClick={handleDeleteUser}>Delete User</button>}
            {props.loggedInUser.id === props.user.id && <button
                onClick={handleAddCountry}>
                Add country you've visited
            </button>}
            {props.loggedInUser.id !== props.user.id && < button onClick={handleLoginAs}>Login as</button>}
        </div>
    )
}
