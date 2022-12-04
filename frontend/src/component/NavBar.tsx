import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Language} from "@mui/icons-material";

export default function NavBar() {
    const navItems = [
        {
            name: 'Home',
            path: "/"
        }
        , {
            name: 'Sign Up',
            path: "/"
        }, {
            name: 'Overview',
            path: "/overview"
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
                    <Language/>
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: 'flex'}}>
                    Country tracker
                </Typography>

                <Box>
                    {navItems.map((item) => (
                        <Button key={item.name} onClick={() => handleNavigation(item.path)}>{item.name}</Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>

    )
}