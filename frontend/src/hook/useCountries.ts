import {useEffect, useState} from "react";
import {Country} from "../model/Country";
import {getCountries} from "../apiCalls";

export default function useCountries(){
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(()=>{
        getCountries().then(data =>
            setCountries(data))
    }, [])

    return {countries}

}