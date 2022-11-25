import {NewUser} from "../model/User";
import {ChangeEvent, useState} from "react";

type AddUserProps ={
    creatUser:(user:NewUser)=> void
}

export default function AddUser(props:AddUserProps){
    const emptyUser:NewUser={
        name:""
    }
    const[newUser,setNewUser]=useState<NewUser>(emptyUser)
    function handleSubmit(){
        props.creatUser(newUser)
    }

    function handleOnChange(event:ChangeEvent<HTMLInputElement>){
        setNewUser(prevState => ({...prevState, [event.target.name]: event.target.value}))

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    UserName:
                    <input
                        type={"text"}
                        name={"name"}
                        value={newUser.name}
                        onChange={handleOnChange}
                        placeholder={"hi, traveller"}
                    />
                </label>
            </form>
        </div>
    )
}