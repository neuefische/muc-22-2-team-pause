import {ChangeEvent, FormEvent, useState} from "react";
import {LoginUser} from "../model/User";
type LoginProps ={
    handleLogInUser(user:LoginUser):void
}
export default function Login(props:LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)

    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleLogInUser({username:username,password:password})
    }

    return (<div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input type={"text"} placeholder={"username"} value={username} onChange={handleUsernameChange}/>
                <input type={"password"} placeholder={"password"} value={password} onChange={handlePasswordChange}/>
                <button type={"submit"}> Login</button>
            </form>
        </div>
    )
}