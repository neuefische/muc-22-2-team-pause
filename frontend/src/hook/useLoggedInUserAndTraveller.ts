import {useEffect, useState} from "react";
import {UserLoginRequest, Traveller} from "../model/User";
import {getLoggedInTraveller, getLoggedInUserName, login, logoutUser} from "../apiCalls";

export default function useLoggedInUserAndTraveller(){
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id:"",name:"",visitedCountries:[]});
    const [username, setUsername] = useState<string>("")

    useEffect(()=> {
        getLoggedInUserName()
            .then(()=>getLoggedInTraveller(username)
                .then(data => setLoggedInTraveller(data)))
    }, [username])

    function loginUser(user:UserLoginRequest):Promise<string>{
        return login(user).then(data=> {
            setUsername(data)
            return data
        })
    }

    //logout function
    function logout(){
        return logoutUser()
    }

    return{loggedInTraveller,logout,loginUser, username}
}