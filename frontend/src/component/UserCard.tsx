import {Traveller} from "../model/User";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, ButtonGroup, Card, CardContent, TextField, Typography} from "@mui/material";
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

    return (<Card variant={"outlined"} className={"card"}>
            <CardContent className={"cardContent"}>
                <Typography variant={"h4"} align={"center"}>{props.user.name}</Typography>
                <Box>{props.user.visitedCountries &&
                    props.user.visitedCountries.map((country) =>
                        <Typography variant={"subtitle1"} key={country.threeLetterCode}>
                            {country.name}[{country.threeLetterCode}] {country.flag}
                        </Typography>)
                }
                </Box>
                {props.loggedInUser.id === props.user.id &&
                    <Box sx={{
                        my: 3
                    }}>
                        <TextField label={"Name"}
                                   type={"text"}
                                   name={"name"}
                                   onChange={handleNameChange}
                                   placeholder={"New name..."}
                                   required={true}
                                   color={"secondary"}
                        />

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

                <ButtonGroup variant={"contained"}>
                    {props.loggedInUser.id === props.user.id && <Button
                        startIcon={<DeleteForever/>}
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </Button>
                    }
                    {props.loggedInUser.id === props.user.id && <Button
                        startIcon={<Add/>}
                        onClick={handleAddCountry}
                    >
                        Add country you've visited
                    </Button>}
                    {props.loggedInUser.id !== props.user.id && <Button onClick={handleLoginAs}>Login as</Button>}
                </ButtonGroup>
            </CardContent>
        </Card>

    )
}
