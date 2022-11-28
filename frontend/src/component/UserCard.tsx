import {User} from "../model/User";
import React from "react";

type UserCardProps = {
    user: User
    handleLoginAs(user: User): void;
}


export default function UserCard(props: UserCardProps) {


    function handleLoginAs() {
        props.handleLoginAs(props.user)
    }

    return (<div>
            <h2>Name:{props.user.name} </h2>
            <button onClick={handleLoginAs}>Login as</button>
        </div>

    )
}
