import React, {useEffect, useState} from "react";
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {Country} from "../model/Country";
import {Traveller} from "../model/User"
import {updateUser} from "../apiCalls";
import {Box, Tooltip, Typography} from "@mui/material";


type WorldMapProps = {
    loggedInTraveller: Traveller,
    countries: Country[]
}

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(props: WorldMapProps) {
    const [visitedCountries, setVisitedCountries] = useState<string[]>([])
    useEffect(() => {

        props.loggedInTraveller.visitedCountries.forEach((country: Country) => {
            setVisitedCountries(prevState => [...prevState, country.threeLetterCode])
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
            setVisitedCountries(prevState => [...prevState, countryById.threeLetterCode])
            updateUser(props.loggedInTraveller.id, props.loggedInTraveller)
                .catch(console.error)
        }
    }

    return (
        <Box>
            <Typography variant={"h4"} textAlign={"center"} sx={{mt:3}}>Personal Map</Typography>

            <Typography variant={"subtitle2"}
                        textAlign={"center"}
                        sx={{mt:3}}>Click on a country to add it to your list
            </Typography>

            <Box>
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Tooltip key={"tooltip:"+geo.rsmKey} title={geo.properties.name}>
                                <Geography
                                    fill={visitedCountries.includes(geo.id) ? "#78002e" : "#f8bbd0"}
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
                                </Tooltip>
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </Box>
        </Box>

    )
}

