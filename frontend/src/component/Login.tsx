import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {UserLoginRequest} from "../model/User";
import {Navigate, useNavigate} from "react-router-dom";
import {Box, IconButton, TextField, Typography} from "@mui/material";
import {LoginSharp} from "@mui/icons-material";

type LoginProps = {
    handleLogInUser(user: UserLoginRequest): Promise<void>
    loggedInUsername: string
}
export default function Login(props: LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState<boolean>(false);

    useEffect(()=>{
        const loggedIn:boolean = props.loggedInUsername !== "anonymousUser" && props.loggedInUsername !== ""
        setAlreadyLoggedIn(loggedIn)
    },[props.loggedInUsername])

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleLogInUser({username: username, password: password}).then(() => {
            navigate("/overview")
        })
    }

    return (alreadyLoggedIn ? <Navigate to={"/overview"}/> :
            <Box flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}
                 margin={"30px"}>

                <Typography variant={"h4"} textAlign={"center"} sx={{mb: 5}}>Login</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField onChange={handleUsernameChange} value={username} placeholder={"Hi, traveller"}/>
                    <TextField type={"password"} onChange={handlePasswordChange} value={password} placeholder={"****"}/>
                    <IconButton type={"submit"} color={"secondary"}>
                        <LoginSharp/>
                    </IconButton>
                </form>

            </Box>

    )
}