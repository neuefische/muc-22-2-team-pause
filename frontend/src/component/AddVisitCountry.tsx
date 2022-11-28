import {Country} from "../model/Country";
import {ChangeEvent, useState} from "react";
import VisitCountryCard from "./VisitCountryCard";

type AddVisitCountryProps = {
    countries: Country[]
}
export default function AddVisitCountry(props: AddVisitCountryProps) {

    const [searchQuery, setSearchQuery] = useState("")

    const filteredCountries = props.countries.filter(country => {
        return country.name.includes(searchQuery)
            || country.threeLetterCode.includes(searchQuery) || country.flag.includes(searchQuery)
    })

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value)
    }


    function addCountryToUser() {
        //TODO: Get the LoggedInUser here
    }

    return (
        <div>
            <div>
                <input type={"search"} onChange={handleSearchText} placeholder={"Search for a country.."}/>
            </div>
            <div>
                {filteredCountries.map((value) => {
                    return <VisitCountryCard country={value}
                                             addCountryToUser={addCountryToUser}
                                             key={value.threeLetterCode}/>
                })}
            </div>
        </div>
    )
}