import AddUser from "./AddUser";
import {NewUser} from "../model/User";
import {addUser} from "../ApiCalls";
import {useNavigate} from "react-router-dom";

export default function SignUp (){
    const navigate = useNavigate()

    function createUser(user:NewUser){
        addUser(user).then(data => {
            navigate("/overview",{state:data})
        })
    }

    return(
        <AddUser createUser={createUser}/>
    )
}