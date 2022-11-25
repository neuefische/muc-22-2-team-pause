import AddUser from "./AddUser";
import {NewUser} from "../model/User";


type LoginProps ={
    createUser:(user:NewUser)=> void
}
export default function Login(props:LoginProps){


    return(
        <AddUser createUser={props.createUser}/>
    )
}