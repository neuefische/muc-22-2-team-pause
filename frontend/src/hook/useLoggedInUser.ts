import {useEffect, useState} from "react";
import {LoginUser, Traveller} from "../model/User";
import {getLoggedInTraveller, getLoggedUserName, login, logoutUser} from "../apiCalls";

export default function useLoggedInUser(){
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id:"",name:"",visitedCountries:[]});

    useEffect(()=> {
        getLoggedUserName()
            .then(data=>getLoggedInTraveller(data)
                .then(data => setLoggedInTraveller(data)))
        //check who's logged in if annoyUser sent to login
        //get Traveller via username
    }, [])
    function loginUser(user:LoginUser):Promise<string>{
        return login(user).then(data=> data)
    }

    //logout function
    function logout(){
        return logoutUser()
    }

    return{loggedInTraveller,logout,loginUser}
}