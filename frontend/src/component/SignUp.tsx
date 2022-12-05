import AddUser from "./AddUser";
import {NewUser, Traveller} from "../model/User";
import {addUser} from "../apiCalls";
import {useNavigate} from "react-router-dom";

type SignUpProps = {
    setLoggedInUser(data: Traveller): void;
}

export default function SignUp(props: SignUpProps) {
    const navigate = useNavigate()

    function createUser(user: NewUser) {
        addUser(user)
            .then(data => {
                handleNewUser(data)
                navigate("/overview")
            })
    }

    function handleNewUser(data: Traveller) {
        props.setLoggedInUser(data)
    }

    return (
        <AddUser createUser={createUser}/>
    )
}