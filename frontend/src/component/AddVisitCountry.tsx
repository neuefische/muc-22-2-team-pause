import {Country} from "../model/Country";
import {SyntheticEvent} from "react";
import "./AddVisitCountry.css";
import {Traveller} from "../model/User";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../apiCalls";
import {Autocomplete, Box, LinearProgress, TextField} from "@mui/material";
import useCountries from "../hook/useCountries";

type AddVisitCountryProps = {
    loggedInTraveller: Traveller
}
export default function AddVisitCountry(props: AddVisitCountryProps) {
    const navigate = useNavigate()
    const {countries} = useCountries()

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
    if(countries){
        return (
            <Autocomplete className={"autocomplete"}
                          onChange={addCountryToUser}
                          renderInput={(params) =>
                              <TextField {...params} label={"Choose a country"}/>}
                          getOptionLabel={(option) => option.name+ " " + option.flag}
                          options={countries}
            />
        )
    }else {
        return (<Box
            alignItems={"center"}
            margin={30}>
        <LinearProgress color={"secondary"}/>
    </Box>)
    }

}