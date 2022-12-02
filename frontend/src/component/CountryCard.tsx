import {Country} from "../model/Country";
import "./CountryCard.css"
type VisitCountryCardProps = {
    country:Country
    addCountryToUser(country: Country): void;
}

export default function CountryCard (props:VisitCountryCardProps){

    function handleAdd() {
        props.addCountryToUser(props.country)
    }

    return(<div className={"card"}>
        <h2>{props.country.name}</h2>
        <h3>{props.country.flag}</h3>
        <h4>{props.country.threeLetterCode}</h4>
        <button onClick={handleAdd}> Add to user</button>
    </div>)
}