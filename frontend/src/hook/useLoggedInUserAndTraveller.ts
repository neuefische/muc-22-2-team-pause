import {useEffect, useState} from "react";
import {UserLoginRequest, Traveller} from "../model/User";
import {getLoggedInTravellerByLoggedInUser, login, logoutUser} from "../apiCalls";

export default function useLoggedInUserAndTraveller(){
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id:"",name:"",visitedCountries:[]});
    const [username, setUsername] = useState<string>("")

    useEffect(()=> {
        getLoggedInTravellerByLoggedInUser().then(data => {
            setUsername(data.username)
            setLoggedInTraveller(data.traveller)
        }).catch(console.error)
    }, [username])

    function loginUser(user:UserLoginRequest):Promise<string>{
        return login(user).then(data=> {
            setUsername(data.username)
            setLoggedInTraveller(data.traveller)
            return data
        })
    }

    //logout function
    function logout(){
        return logoutUser()
    }

    return{loggedInTraveller,logout,loginUser, username}
}