import React, {useEffect, useState} from "react";
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {Country} from "../model/Country";
import {Traveller} from "../model/User"
import {updateUser} from "../apiCalls";


type WorldMapProps = {
    loggedInTraveller: Traveller,
    countries:Country[]
}

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props: WorldMapProps) {

    const [countries,setCountries] = useState<string[]>([])
    useEffect(() => {

        props.loggedInTraveller.visitedCountries.forEach((country:Country) => {
            setCountries(prevState => [...prevState, country.threeLetterCode])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleClick = (countryId: string) => {
        const countryById = props.countries.find((country) => {
            if (country.threeLetterCode === countryId) {
                return country
            } else {
                return undefined
            }
        });

        if (countryById) {
            props.loggedInTraveller.visitedCountries.push(countryById)
            setCountries(prevState => [...prevState, countryById.threeLetterCode])
            updateUser(props.loggedInTraveller.id, props.loggedInTraveller)
                .catch(console.error)
        }
    }

    return (<ComposableMap>
            <Geographies geography={geoUrl}>
                {({geographies}) =>
                    geographies.map((geo) => (
                        <Geography
                            fill={countries.includes(geo.id) ? "#78002e" : "#f8bbd0"}
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
                                handleClick(`${geo.id}`)
                            }} key={geo.rsmKey} geography={geo}/>
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

