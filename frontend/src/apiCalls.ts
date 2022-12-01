import axios from "axios";
import {NewUser, User} from "./model/User";

export function getUsers(){
    return axios.get("/api/user")
        .then(response => response.data)
}

export function addUser(user:NewUser){
    return axios.post("/api/user",user)
        .then(response => response.data)
}

export function deleteUser(id:string){
    return axios.delete(`/api/user/${id}`)
}

export function getCountries(){
    return axios.get("/api/countries")
        .then(response => response.data)
}

export function updateUser(id:string,user:User){
    return axios.put(`/api/user/${id}`,user)
        .then(response => response.data)
}