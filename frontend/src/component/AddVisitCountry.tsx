import {Country} from "../model/Country";
import {SyntheticEvent, useState} from "react";
import {Traveller} from "../model/User";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../apiCalls";
import {Autocomplete, Box, Button, Chip, LinearProgress, TextField, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


type AddVisitCountryProps = {
    loggedInTraveller: Traveller
    countries:Country[]
}
export default function AddVisitedCountry(props: AddVisitCountryProps) {
    const navigate = useNavigate()
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([])
    
    function addCountriesToUser() {
        if (!props.loggedInTraveller.visitedCountries) {
            props.loggedInTraveller.visitedCountries = []
        }
        const newPlusOldCountries = [...props.loggedInTraveller.visitedCountries, ...selectedCountries]
        const copyOfLoggedInTraveller = props.loggedInTraveller
        copyOfLoggedInTraveller.visitedCountries = newPlusOldCountries

        updateUser(props.loggedInTraveller.id, copyOfLoggedInTraveller)
            .then(() => {
                navigate("/overview")
            })
            .catch(console.error)
    }

    function handleRemoveCountryFromList(countryId: string) {
        setSelectedCountries((prevState) => {
            return prevState.filter((country) => country.threeLetterCode !== countryId);
        })
    }

    function handleAddCountryToList(event: SyntheticEvent<Element, Event>, selectedCountry: Country | null) {
        if (selectedCountry) {
            setSelectedCountries((prevSelectedCountries) => {
                return [...prevSelectedCountries, selectedCountry]
            })
        }
    }

    const isButtonDisabled: boolean = selectedCountries.length < 1

    if (props.countries) {
        return (<Box display={"flex"}
                     width={'100%'}
                     justifyContent={"center"}
                     marginTop={20}
                     flexDirection={"column"}
                     flexWrap={"wrap"}
                     alignItems={"center"}
            >
                <Autocomplete sx={{width: "80%"}} onChange={handleAddCountryToList}
                              renderInput={(params) =>
                                  <TextField {...params} label={"Choose a country"}/>}
                              getOptionLabel={(option) => option.name + " " + option.flag}
                              options={props.countries}
                />
                <Box marginTop={3}>
                    <Typography textAlign={"center"}
                                variant={"subtitle1"}>
                        Selected countries:
                    </Typography>

                    {selectedCountries.map((selectedCountry) =>
                        <Chip key={selectedCountry.threeLetterCode}
                              label={selectedCountry.name + " " + selectedCountry.flag}
                              color={"secondary"}
                              onDelete={() => handleRemoveCountryFromList(selectedCountry.threeLetterCode)}></Chip>
                    )}
                </Box>

                <Box display={"flex"} justifyContent={"center"} marginTop={2} flexWrap={"wrap"}>
                    <Button
                        variant={"contained"}
                        onClick={addCountriesToUser}
                        startIcon={<AddCircle/>}
                        disabled={isButtonDisabled}>

                        Save
                    </Button>
                </Box>
            </Box>
        )
    } else {
        return (<Box
            alignItems={"center"}
            margin={20}>
            <LinearProgress color={"secondary"}/>
        </Box>)
    }
}