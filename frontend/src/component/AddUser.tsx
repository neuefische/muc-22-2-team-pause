import {NewUser} from "../model/User";
import {ChangeEvent, FormEvent, useState} from "react";

type AddUserProps ={
    createUser:(user:NewUser)=> void
}

export default function AddUser(props:AddUserProps){
    const emptyUser:NewUser={
        username:"",
        password:""
    }
    const [newUser, setNewUser] = useState<NewUser>(emptyUser)


    function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        props.createUser(newUser)
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
                        name={"username"}
                        value={newUser.username}
                        onChange={handleOnChange}
                        placeholder={"hi, traveller"}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type={"password"}
                        name={"password"}
                        value={newUser.password}
                        onChange={handleOnChange}
                        placeholder={"******"}
                    />
                </label>

                <button type={"submit"}>Register</button>
            </form>
        </div>
    )
}
