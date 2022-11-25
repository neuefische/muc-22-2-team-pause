import {Country} from "../model/Country";
import {ChangeEvent, useState} from "react";

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


    return (
        <div>
            <div>
                <input type={"search"} onChange={handleSearchText}/>
            </div>
            <div>
                {filteredCountries.map((value) => {
                    return <div>{value.name + " " + value.flag}</div>
                })}
            </div>
        </div>
    )
}