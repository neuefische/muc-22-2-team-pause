import {ChangeEvent, FormEvent, useState} from "react";
import {login} from "../apiCalls";

export default function Login() {
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
        login({
            username,
            password
        })
            .then((data) => console.log(data))
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