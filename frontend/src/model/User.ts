import {Country} from "./Country";

export type User = {
    name : string,
    id: string,
    visitedCountries: Country[]
}

export type NewUser = {
    name : string,
}