import React from "react";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
export default function WorldMap(){
    function handleClick(event:string) {
        console.log(event)
    }

    return(<ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography onClick={()=>{handleClick(`${geo.id}`) } } key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}