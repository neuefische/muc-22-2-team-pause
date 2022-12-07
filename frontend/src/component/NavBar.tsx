import {AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Home, List, Person, PersonAdd, Public} from "@mui/icons-material";

type NavBarProps = {
    username:string
}
export default function NavBar(props:NavBarProps) {
    const navItems = [
        {
            name: 'Home',
            path: "/",
            icon: <Home/>
        }
        , {
            name: 'Sign Up',
            path: "/",
            icon: <PersonAdd/>
        }, {
            name: 'Overview',
            path: "/overview",
            icon:<List/>
        }];

    const navigate = useNavigate();

    function handleNavigation(path: string) {
        navigate(path)
    }

    return (<AppBar position={"sticky"}
                    color={"secondary"}
                    component={"nav"}>
            <Toolbar>
                <IconButton color={"primary"} onClick={() => handleNavigation('/')}>
                    <Public/>
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: 'flex'}}>
                    Country tracker
                </Typography>

                <Box flexGrow={1}>
                    {navItems.map((item) => (
                        <Button startIcon={item.icon} key={item.name} onClick={() => handleNavigation(item.path)}>{item.name}</Button>
                    ))}
                </Box>

                <Box flexGrow={0}>
                    <Tooltip title={props.username}>
                        <Person/>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>

    )
}