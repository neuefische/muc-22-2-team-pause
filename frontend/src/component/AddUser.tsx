import {NewUser} from "../model/User";
import {ChangeEvent, FormEvent, useState} from "react";
import {Box, IconButton, TextField} from "@mui/material";
import "./AddUser.css"
import {AddSharp} from "@mui/icons-material";

type AddUserProps = {
    createUser: (user: NewUser) => void
}

export default function AddUser(props:AddUserProps){
    const emptyUser:NewUser={
        username:"",
        password:""
    }
    const [newUser, setNewUser] = useState<NewUser>(emptyUser)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.createUser(newUser)
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUser(prevState => ({...prevState, [event.target.name]: event.target.value}))

    }

    return (
        <Box
            flexDirection={"column"}
            display={"grid"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            margin={"30px"}
        >
            <form className={"formContainer"} onSubmit={handleSubmit}>
                <TextField
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    value={newUser.password}
                    onChange={handleOnChange}
                    placeholder={"*******"}
                    required={true}
                />

                <TextField
                    label={"Name"}
                    type={"text"}
                    name={"name"}
                    value={newUser.username}
                    onChange={handleOnChange}
                    placeholder={"hi, new traveller"}
                    required={true}
                />
                <IconButton color={"secondary"} type={"submit"}>
                    <AddSharp/>
                </IconButton>
            </form>
        </Box>
    )
}
