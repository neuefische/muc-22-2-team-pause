import axios from "axios";
import {NewUser, Traveller} from "./model/User";

export function getTravellers(){
    return axios.get("/api/traveller")
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

export function updateUser(id:string,user:Traveller){
    return axios.put(`/api/traveller/${id}`,user)
        .then(response => response.data)
}