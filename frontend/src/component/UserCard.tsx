import {User} from "../model/User";
import React from "react";

type UserCardProps = {
    user: User
    handleLoginAs(user: User): void;
    deleteUser(id:string):void
}

export default function UserCard(props: UserCardProps) {

function handleDeleteUser(){
    console.log("userid: ",props.user.id)
        props.deleteUser(props.user.id)


}

    function handleLoginAs() {
        props.handleLoginAs(props.user)
    }

    return (<div>
            <h2>Name:{props.user.name} </h2>

            <button onClick={handleDeleteUser}>delete User</button>
            <button onClick={handleLoginAs}>Login as</button>
        </div>

    )
}
