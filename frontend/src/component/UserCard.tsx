import {Traveller} from "../model/User";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, ButtonGroup, Card, CardContent, TextField, Typography, useMediaQuery} from "@mui/material";
import "./UserCard.css"
import {Add, DeleteForever, Edit} from "@mui/icons-material";

type UserCardProps = {
    user: Traveller
    loggedInUser: Traveller

    handleDeleteUser(id: string): void
    handleEditUser(id: string, userToEdit: Traveller): void
}

export default function UserCard(props: UserCardProps) {
    const navigate = useNavigate()
    const [changedUserName, setChangedUserName] = useState("")
    const matches = useMediaQuery("(min-width:600px)");

    function handleDeleteUser() {
        props.handleDeleteUser(props.user.id)
        navigate("/")
    }

    function handleEditName() {
        props.user.name = changedUserName
        props.handleEditUser(props.loggedInUser.id, props.user)
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setChangedUserName(event.target.value)
    }


    function handleAddCountry() {
        navigate("/overview/" + props.user.id + "/countries")
    }

    const orientation = matches ? `horizontal` : `vertical`

    return (<Card variant={"outlined"} className={"card"}>
            <CardContent className={"cardContent"}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"flex-end"}
                    flexWrap={"wrap"}>

                    <Typography variant={"h4"} align={"center"}>{props.user.name}</Typography>

                </Box>
                <Box display={"flow"}
                     flexDirection={"row"}
                     flexWrap={"wrap"}
                     alignItems={"flex-start"}
                     sx={{my: 3}}>
                    {props.user.visitedCountries &&
                        props.user.visitedCountries.map((country) =>
                            <Typography variant={"subtitle1"} key={country.threeLetterCode}>
                                {country.name}[{country.threeLetterCode}] {country.flag}
                            </Typography>)
                    }
                </Box>
                {props.loggedInUser.id === props.user.id &&
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
                    {props.loggedInUser.id === props.user.id && <Button
                        startIcon={<DeleteForever/>}
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </Button>}

                    {props.loggedInUser.id === props.user.id &&
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
