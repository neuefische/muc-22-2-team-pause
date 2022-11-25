import axios from "axios";
import {NewUser} from "./model/User";

export function getUsers(){
    return axios.get("/api/user")
}

export function addUser(user:NewUser){
    return axios.post("/api/user",user)
}