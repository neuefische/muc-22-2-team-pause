import {Country} from "../model/Country";
import {SyntheticEvent} from "react";
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
    const navigate = useNavigate()

    function addCountryToUser(event: SyntheticEvent<Element, Event>, value: Country | null) {
        if (!props.loggedInTraveller.visitedCountries) {
            props.loggedInTraveller.visitedCountries = []
        }
        if (value) {
            const copyVisitedCountries = [...props.loggedInTraveller.visitedCountries,value]
            const copyLoggedInTraveller = props.loggedInTraveller
            copyLoggedInTraveller.visitedCountries = copyVisitedCountries

            updateUser(props.loggedInTraveller.id, copyLoggedInTraveller)
                .then(() => {
                    props.loggedInTraveller.visitedCountries= copyVisitedCountries
                    navigate("/overview")
                })
                .catch(console.error)
        }

    }

    return (<Autocomplete className={"autocomplete"}
            onChange={addCountryToUser}
            renderInput={(params) =>
                <TextField {...params} label={"Choose a country"}/>}
            getOptionLabel={(option) => option.name+ " " + option.flag}
            options={props.countries}
        />
    )
}