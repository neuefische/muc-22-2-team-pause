import {ComposableMap, Geographies, Geography,} from "react-simple-maps";
import {User} from "../model/User";
import {Country} from "../model/Country";
import {useEffect, useState} from "react";
import {scaleLinear} from "d3-scale";
import useUsers from "../hook/useUsers";

type HeatMapProps= {
    countries: Country[]
}
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function HeatMap(props: HeatMapProps) {

    const [maxDomain, setMaxDomain ]=useState(1)

    const colorScale = scaleLinear<string>()
        .domain([0, maxDomain ])
        .range(["#f8bbd0", "#ad1457"]);

    const countryList = props.countries
    let userList: User[] = useUsers().users

    const [output,setOutput]=useState<{
        country:string,
        count: number }[]>([])

    useEffect(() => {
        const threeLetterCodeList = countryList.map(Country => Country.threeLetterCode)
        function setCount(country: string) {
            return {
                country,
                count: 0
            };
        }

        let output = threeLetterCodeList.map(setCount);
        for (const element of userList) {
            for (const item of element.visitedCountries) {
                const threeLetterCodeToCount = item.threeLetterCode
                for (const element of output) if (element.country === threeLetterCodeToCount) {
                    element.count++
                }
            }
        }
        let countVisits=[]
        for (const element of output) countVisits.push(element.count)
        let maxVisits = Math.max(...countVisits)
        setMaxDomain(maxVisits)
        setOutput(output)
    }, [])

        return (
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
                                    for (const element of output) {
                                        if (geo.id === element.country) {
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={colorScale(element.count)}
                                        />
                                    );
                                    }
                                    }
                                })
                            }
                        </Geographies>
                    )}
                </ComposableMap>

        );

};
