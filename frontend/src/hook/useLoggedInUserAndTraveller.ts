import {useEffect, useState} from "react";
import {UserLoginRequest, Traveller} from "../model/User";
import {getLoggedInTravellerByLoggedInUser, login, logoutUser} from "../apiCalls";

export default function useLoggedInUserAndTraveller() {
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id: "", name: "", visitedCountries: []});
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        getLoggedInTravellerByLoggedInUser().then(data => {
            setUsername(data.username)
            setLoggedInTraveller(data.traveller)
        }).catch(error => {
            if (error.response.status !== 404){
                console.error(error)
            }
        })
    }, [])

    function loginUser(user: UserLoginRequest):Promise<void> {
        return login(user).then(data => {
            setUsername(data.username)
            setLoggedInTraveller(data.traveller)
        })
    }

    //logout function
    function logout() {
        return logoutUser()
    }

    return {loggedInTraveller, logout, loginUser, username}
}