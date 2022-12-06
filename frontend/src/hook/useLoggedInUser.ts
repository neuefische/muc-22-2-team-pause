import {useEffect, useState} from "react";
import {LoginUser, Traveller} from "../model/User";
import {getLoggedInTraveller, getLoggedUserName, login, logoutUser} from "../apiCalls";

export default function useLoggedInUser(){
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id:"",name:"",visitedCountries:[]});
    const [username, setUsername] = useState<string>("")

    useEffect(()=> {
        getLoggedUserName()
            .then(()=>getLoggedInTraveller(username)
                .then(data => setLoggedInTraveller(data)))
    }, [username])

    function loginUser(user:LoginUser):Promise<string>{
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