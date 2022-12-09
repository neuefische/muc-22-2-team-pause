import {Traveller} from "../model/User";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, ButtonGroup, Card, CardContent, TextField, Typography, useMediaQuery} from "@mui/material";
import "./UserCard.css"
import {Add, DeleteForever, Edit} from "@mui/icons-material";

type UserCardProps = {
    loggedInTraveller: Traveller
    handleDeleteUser(id: string): void
    handleEditUser(id: string, userToEdit: Traveller): void
}

export default function UserCard(props: UserCardProps) {
    const navigate = useNavigate()
    const [changedUserName, setChangedUserName] = useState("")
    const matches = useMediaQuery("(min-width:600px)");

    function handleDeleteUser() {
        props.handleDeleteUser(props.loggedInTraveller.id)
        navigate("/")
    }

    function handleEditName() {
        props.loggedInTraveller.name = changedUserName
        props.handleEditUser(props.loggedInTraveller.id, props.loggedInTraveller)
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setChangedUserName(event.target.value)
    }


    function handleAddCountry() {
        navigate("/overview/" + props.loggedInTraveller.id + "/countries")
    }

    const orientation = matches ? `horizontal` : `vertical`

    return (<Card variant={"outlined"} className={"card"}>
            <CardContent className={"cardContent"}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"flex-end"}
                    flexWrap={"wrap"}>

                    <Typography variant={"h4"} align={"center"}>{props.loggedInTraveller.name}</Typography>

                </Box>
                <Box display={"flow"}
                     flexDirection={"row"}
                     flexWrap={"wrap"}
                     alignItems={"flex-start"}
                     sx={{my: 3}}>
                    {props.loggedInTraveller.visitedCountries &&
                        props.loggedInTraveller.visitedCountries.map((country) =>
                            <Typography variant={"subtitle1"} key={country.threeLetterCode}>
                                {country.name}[{country.threeLetterCode}] {country.flag}
                            </Typography>)
                    }
                </Box>
                {props.loggedInTraveller.id === props.loggedInTraveller.id &&
                    <Box display={"flex"}
                         flexWrap={"wrap"}
                         flexDirection={"row"}
                         alignItems={"flex-start"}
                         sx={{my: 3}}>

                        <TextField label={"Name"}
                                   type={"text"}
                                   name={"name"}
                                   onChange={handleNameChange}
                                   placeholder={"New name..."}
                                   required={true}
                                   color={"secondary"}
                                   sx={{
                                       mb: 2
                                   }}/>

                        <Button variant={"contained"}
                                startIcon={<Edit/>}
                                color={"secondary"}
                                sx={{
                                    height: 53,
                                    ml: 2,
                                }}
                                onClick={handleEditName}>
                            Edit name
                        </Button>
                    </Box>
                }

                <ButtonGroup
                    variant={"contained"}
                    fullWidth={true}
                    orientation={orientation}>
                    {props.loggedInTraveller.id === props.loggedInTraveller.id && <Button
                        startIcon={<DeleteForever/>}
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </Button>}

                    {props.loggedInTraveller.id === props.loggedInTraveller.id &&
                        <Button
                            startIcon={<Add/>}
                            onClick={handleAddCountry}>

                            Add country you've visited

                        </Button>
                    }
                </ButtonGroup>
            </CardContent>
        </Card>

    )
}
