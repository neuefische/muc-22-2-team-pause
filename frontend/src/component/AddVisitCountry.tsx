import {Country} from "../model/Country";
import {ChangeEvent, useState} from "react";
import VisitCountryCard from "./VisitCountryCard";
import "./AddVisitCountry.css"
import {User} from "../model/User";
import {updateUser} from "../apiCalls";
import {useNavigate} from "react-router-dom";

type AddVisitCountryProps = {
    countries: Country[],
    loggedInUser: User
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
        if (!props.loggedInUser.visitedCountries) {
            props.loggedInUser.visitedCountries = []
        }

        props.loggedInUser.visitedCountries.push(country)

        updateUser(props.loggedInUser.id, props.loggedInUser)
            .then(() => {
                navigate("/overview")
            })
            .catch(console.error)
    }

    return (
        <div>
            <div>
                <input type={"search"} onChange={handleSearchText} placeholder={"Search for a country.."}/>
            </div>
            <div className={"card-display"}>
                {filteredCountries.length < 5 && filteredCountries.map((value) => {
                    return <VisitCountryCard country={value}
                                             addCountryToUser={addCountryToUser}
                                             key={value.threeLetterCode}/>
                })}
            </div>
        </div>
    )
}