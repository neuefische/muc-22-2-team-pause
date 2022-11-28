import AddUser from "./AddUser";
import {NewUser} from "../model/User";
import {addUser} from "../ApiCalls";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignUp (){
    const [loggedInUser, setLoggendInUser] = useState()
    const navigate = useNavigate()

    function createUser(user:NewUser){
        addUser(user).then(data => {
            setLoggendInUser(data)
        }).then(()=>{
            navigate("/overview",{state:loggedInUser})
        })
    }

    return(
        <AddUser createUser={createUser}/>
    )
}