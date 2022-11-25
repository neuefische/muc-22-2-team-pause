import {User} from "../model/User";
import React from "react";

type UserCardProps = {
    user: User
}


export default function UserCard(props: UserCardProps) {


    return (<div>
            <h2>Name:{props.user.name} </h2>
        </div>

    )
}
