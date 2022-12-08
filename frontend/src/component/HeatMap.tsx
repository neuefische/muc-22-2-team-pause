import {ComposableMap, Geographies, Geography,} from "react-simple-maps";
import {User} from "../model/User";
import {Country} from "../model/Country";
import {useState} from "react";
import {scaleLinear} from "d3-scale";
import {getUsers} from "../apiCalls";

type HeatMapProps= {
    registeredUsers : User
    countries: Country[]
}

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const colorScale = scaleLinear<string>()
    .domain([0, 4])
    .range(["#ffeeff", "#c48b9f"]);

export default function HeatMap(props: HeatMapProps) {

    const countryList = props.countries
    const userList = getUsers()

    let registeredUsers: User[] = []

    let registeredUser0: User = {id: "1", name: "KoljaTraveller", visitedCountries: [countryList[15], countryList[2], countryList[3]]}
    let registeredUser1: User = {id: "2", name: "OljaTraveller", visitedCountries: [countryList[15], countryList[2]]}
    let registeredUser2: User = {id: "3", name: "LjaTraveller", visitedCountries: [countryList[15]]}

    registeredUsers.push(registeredUser0)
    registeredUsers.push(registeredUser1)
    registeredUsers.push(registeredUser2)

    const [output,setOutput]=useState<{
        country:string,
        count: number }[]>([])

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
                        output[k].count++ //funktioniert soweit sogut ausser hochzählen UseState
                    }

                }
            }
        }
        setOutput(output)
        console.log(userList)
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
                    {output.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => {
                                    for (let i = 0; i < output.length; i++) {
                                    if (geo.id === output[i].country){
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colorScale(output[i].count)}
                                        />
                                    );
                                    }
                                    }
                                })
                            }
                        </Geographies>
                    )}
                </ComposableMap>
            </div>

        );

};
