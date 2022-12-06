import React, {useState} from "react";
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {Country} from "../model/Country";
import {User} from "../model/User"
import "./WorldMap.css";


type WorldMapProps = {
    loggedInUser: User,
    countries: Country[]
}

const visited: Country [] = []


const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props: WorldMapProps) {

    const [selectedCountries, setSelectedCountries] = useState<string[]>([])


    const handleClick = (countryID: string) => {
        const countries = props.countries

        for (const country of countries) {
            if (countryID === country.threeLetterCode) {
                console.log(country)
                visited.push(country)
                setSelectedCountries(prevState => [...prevState, countryID])
            }
        }
        return visited
    }

    return (<ComposableMap>
            <Geographies geography={geoUrl}>
                {({geographies}) =>
                    geographies.map((geo) => (
                        <Geography
                            fill={selectedCountries.includes(geo.id) ? "#78002e" : "#f8bbd0"}
                            style={{
                                hover: {
                                    fill: "#ad1457",
                                    outline: "none"
                                },
                            }}
                            onClick={() => {
                                handleClick(`${geo.id}`)
                            }} key={geo.rsmKey} geography={geo}/>
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}
