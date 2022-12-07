import {scaleLinear} from 'd3-scale';
import {ComposableMap, Geographies, Geography,} from "react-simple-maps";
import {User} from "../model/User";
import {Country} from "../model/Country";

type HeatMapProps= {
    registeredUsers : User //müsste List sein, der einfachheit halber so
    countries: Country[]
}

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const colorScale = scaleLinear()  //scale für colors
    .domain([0.1, 0.9])
    .range([0,1]); //Hier waren mal die Farben drin; Range als Opacity??



export default function HeatMap(props: HeatMapProps) {
    const countryList = props.countries

    let registeredUsers: User[] = []

    let registeredUser0: User = {id: "1", name: "KoljaTraveller", visitedCountries: [countryList[1], countryList[2], countryList[3]]}
    let registeredUser1: User = {id: "2", name: "OljaTraveller", visitedCountries: [countryList[1], countryList[2]]}
    let registeredUser2: User = {id: "3", name: "LjaTraveller", visitedCountries: [countryList[1]]}


    registeredUsers.push(registeredUser0)
    registeredUsers.push(registeredUser1)
    registeredUsers.push(registeredUser2)


    const data = handleClick() //Variable für ColorScale bzw. output v count

    function handleClick() {
        const onlyThreeLetterCodes = countryList.map(Country => Country.threeLetterCode) //Map to only get TLC

        function setCount(country: string) { //Create eachCount Object containing TLC and count
            return {
                country,
                count: 0
            };
        }
        let output = onlyThreeLetterCodes.map(setCount);//Map new array output containing
        for (let i = 0; i < registeredUsers.length; i++) {  //3 "registrierte" User
            for (let j = 0; j < registeredUsers[i].visitedCountries.length; j++) {
                const countedCountryCode = registeredUsers[i].visitedCountries[j].threeLetterCode
                for (let k = 0; k < output.length; k++) {
                    if (output[k].country === countedCountryCode) {
                        console.log("includes=true"+ " outputicountry is: " + output[k].country + ", CCC is: " + countedCountryCode)
                        output[k].count++ //funktioniert soweit sogut ausser hochzählen UseState
                    }
                    console.log(output[k].country + " is not: " + countedCountryCode)
                }
            }
        }
        return output
    }


        return (
            <div>
                <button onClick={handleClick}>SecondTry</button>
                <ComposableMap
                    projectionConfig={{
                        rotate: [-10, 0, 0],
                        scale: 147
                    }}
                >
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => {
                                    //const d = data.find((name) => name.visitedCountries[].threeLetterCode === geo.id);
                                    return (
                                        <Geography

                                            key={geo.rsmKey}
                                            geography={geo}
                                      //      fill={d ? colorScale(d.[]) : "#78002e"}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
                </ComposableMap>
            </div>

        );

};
