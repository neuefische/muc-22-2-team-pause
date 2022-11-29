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
        console.log("userid: ", props.user.id)
        props.deleteUser(props.user.id)
        navigate("/")
    }

    function handleLoginAs() {
        props.handleLoginAs(props.user)
    }

    return (<div>
            <h2>Name:{props.user.name} </h2>
            {props.loggedInUser.id === props.user.id && <button onClick={handleDeleteUser}>delete User</button>}
            {props.loggedInUser.id !== props.user.id && < button onClick={handleLoginAs}>Login as</button>}
        </div>
    )
}
