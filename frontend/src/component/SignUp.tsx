import AddUser from "./AddUser";
import {NewUser} from "../model/User";
import {addUser} from "../apiCalls";
import {useNavigate} from "react-router-dom";


export default function SignUp() {
    const navigate = useNavigate()

    function createUser(user: NewUser) {
        addUser(user)
            .then(() => {
                navigate("/login")
            })
    }

    return (
        <AddUser createUser={createUser}/>
    )
}