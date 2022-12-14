import {Country} from "./Country";

export type Traveller = {
    name: string,
    id: string,
    visitedCountries: Country[]
}

export type NewUser = {
    password: string;
    username: string,
}

export type UserLoginRequest = {
    password: string,
    username: string
}