import {Country} from "../model/Country";
import {ChangeEvent, useState} from "react";
import CountryCard from "./CountryCard";
import "./AddVisitCountry.css";
import {Traveller} from "../model/User";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../apiCalls";
import {Autocomplete, TextField} from "@mui/material";

type AddVisitCountryProps = {
    countries: Country[],
    loggedInTraveller: Traveller
}
export default function AddVisitCountry(props: AddVisitCountryProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const filteredCountries = props.countries.filter(country => {
        return country.name.toLowerCase().includes(searchQuery.toLowerCase())
            || country.threeLetterCode.toLowerCase().includes(searchQuery.toLowerCase())
            || country.flag.toLowerCase().includes(searchQuery.toLowerCase())
    })

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value)
    }


    function addCountryToUser(country: Country) {
        if (!props.loggedInTraveller.visitedCountries) {
            props.loggedInTraveller.visitedCountries = []
        }

        props.loggedInTraveller.visitedCountries.push(country)

        updateUser(props.loggedInTraveller.id, props.loggedInTraveller)
            .then(() => {
                navigate("/overview")
            })
            .catch(console.error)
    }

    return (
        <div>
            <Autocomplete renderInput={(params) =>
                <TextField {...params} label={"Choose a country"}/>}
                          getOptionLabel={(option) => option.name}
                          options={props.countries}
            />
            <div>
                <input type={"search"} onChange={handleSearchText} placeholder={"Search for a country.."}/>
            </div>
            <div className={"card-display"}>
                {filteredCountries.length < 5 && filteredCountries.map((value) => {
                    return <CountryCard country={value}
                                        addCountryToUser={addCountryToUser}
                                        key={value.threeLetterCode}/>
                })}
            </div>
        </div>
    )
}