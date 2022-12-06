import React, {useState} from "react";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {Country} from "../model/Country";
import {User} from "../model/User"
import "./WorldMap.css";



type WorldMapProps = {
    loggedInUser:User,
    countries: Country[]

}

const visited:Country []=[]
const visitedId:string []=[]

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props:WorldMapProps) {

    const[selectedCountries,setSelectedCountries] = useState<string[]>([])


    const handleClick = (event: any) => {
        const countries = props.countries
        const countryID = event



        for (const country of countries) {
            if (countryID === country.threeLetterCode) {
                console.log(country)
                visited.push(country)
                visitedId.push(countryID)
                setSelectedCountries(visitedId)

            }
        }
        console.log("event",event)
        //console.log(countryID)
        console.log("visitedId: ",visitedId)
        return visited
    }

    return (<ComposableMap>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map((geo) => (
                            <Geography
                                fill = {selectedCountries.includes(geo.id) ? "#78002e" : "#f8bbd0"}
                                onClick={() => {
                                handleClick(`${geo.id}`)
                            }} key={geo.rsmKey} geography={geo}/>
                        ))
                    }
                </Geographies>
            </ComposableMap>
        )
    }
