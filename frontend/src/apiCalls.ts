import axios from "axios";
import {LoginUser, NewUser, Traveller} from "./model/User";

export function getTravellers() {
    return axios.get("/api/traveller")
        .then(response => response.data)
}

export function addUser(user: NewUser) {
    return axios.post("/api/user", user)
        .then(response => response.data)
}

export function deleteUser(id: string) {
    return axios.delete(`/api/user/${id}`)
}

export function getCountries() {
    return axios.get("/api/countries")
        .then(response => response.data)
}

export function updateUser(id: string, user: Traveller) {
    return axios.put(`/api/traveller/${id}`, user)
        .then(response => response.data)
}

export function login(toLoginUser: LoginUser) {
    return axios.post("/api/user/login", undefined, {
        auth: {
            username:toLoginUser.username,
            password:toLoginUser.password
        }
    }).then(response => response.data)
}

export function getLoggedUserName(){
   return  axios.get("/api/user/login/me")
        .then(response=>response.data)
}

export function getLoggedInTraveller(name: string){
    return axios.get("/api/user/"+name)
        .then(response=>response.data)
        .then(data=>axios.get("/api/traveller/" +data)
            .then(response=>response.data)
        )
}

export function logoutUser(){
    return axios.post("/api/user/logout").then(response => response.data)
}