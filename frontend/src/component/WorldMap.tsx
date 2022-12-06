import React, { useEffect, useState} from "react";
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {Country} from "../model/Country";
import {User} from "../model/User"
import "./WorldMap.css";
import {updateUser} from "../apiCalls";


type WorldMapProps = {
    loggedInUser: User,
    countries: Country[]
}

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props: WorldMapProps) {

    const [selectedCountries, setSelectedCountries] = useState<string[]>([])

    useEffect(() => {

        props.loggedInUser.visitedCountries.forEach((visitedCountry) => {
            setSelectedCountries(prevState => [...prevState, visitedCountry.threeLetterCode])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleCountryClick = (countryId: string) => {
        const countryByCountryId = props.countries.find((country) => {
            if (country.threeLetterCode === countryId) {
                return country
            }else{
                return undefined
            }
        });

        if (countryByCountryId) {
            props.loggedInUser.visitedCountries.push(countryByCountryId)
            setSelectedCountries(prevState => [...prevState, countryByCountryId.threeLetterCode])
            updateUser(props.loggedInUser.id, props.loggedInUser)
                .catch(console.error)
        }
    }

    return (<ComposableMap>
            <Geographies geography={geoUrl}>
                {({geographies}) =>
                    geographies.map((geo) => (
                        <Geography
                            fill={selectedCountries.includes(geo.id) ? "#78002e" : "#f8bbd0"}
                            style={{
                                default: {
                                    outline: "black"
                                },
                                hover: {
                                    fill: "#ad1457",
                                    outline: "none"
                                },
                            }}
                            onClick={() => {
                                handleCountryClick(`${geo.id}`)
                            }} key={geo.rsmKey} geography={geo}/>
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}
