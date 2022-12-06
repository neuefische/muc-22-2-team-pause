import {useEffect, useState} from "react";
import {Traveller} from "../model/User";

export default function useLoggedInUser(){
    const [loggedInTraveller, setLoggedInTraveller] = useState<Traveller>({id:"",name:"",visitedCountries:[]});
    const [loggedInUserName, setLoggedInUsername] = useState<string>("");

    useEffect(()=> {
        //check who's logged in if annoyUser sent to login
        //get Traveller via username
    }, [])
    function loginUser(username:string, password:string):Promise<string>{
        return loginUser(username,password).then(data=> data)
    }

    //logout function
}