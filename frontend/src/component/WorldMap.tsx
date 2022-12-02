import React from "react";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {Country} from "../model/Country";
import {User} from "../model/User"

type WorldMapProps = {
    loggedInUser:User,
    countries: Country[]

}

const visited:Country []=[]

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props:WorldMapProps) {
    const handleClick = (event: string) => {
        const countries = props.countries

        for (const country of countries) {
            if (event === country.threeLetterCode) {
                console.log(country)
                visited.push(country)
            }
        }
        return visited
    }



    return (<ComposableMap>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map((geo) => (
                            <Geography
                                style={{
                                    default: {
                                    fill: "#f8bbd0",
                                    outline: "none"
                                },
                                    hover: {
                                    fill: "#ad1457",
                                    outline: "none"
                                },
                                    pressed: {
                                    fill: "#78002e",
                                    outline: "none"
                                }

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
