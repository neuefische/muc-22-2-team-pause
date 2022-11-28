import AddUser from "./AddUser";
import {NewUser, User} from "../model/User";
import {addUser} from "../apiCalls";
import {useNavigate} from "react-router-dom";

type SignUpProps = {
    setLoggedInUser(data: User): void;
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

    function handleNewUser(data: User) {
        props.setLoggedInUser(data)
    }

    return (
        <AddUser createUser={createUser}/>
    )
}