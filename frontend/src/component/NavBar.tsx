import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputAdornment, styled, Menu, MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Home, List, Map, Person, PersonAdd, Public} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import "./NavBar.css";

type NavBarProps = {
    username: string
    handleSearch(searchText: string): void
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#f8bbd0',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#f8bbd0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#f8bbd0',
        },
        '&:hover fieldset': {
            borderColor: '#f8bbd0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#f8bbd0',
        },
    },
});


export default function NavBar(props: NavBarProps) {
    const navItems = [
        {
            name: 'Home',
            path: "/",
            icon: <Home/>
        }
        , {
            name: 'Sign Up',
            path: "/signup",
            icon: <PersonAdd/>
        }, {
            name: 'Overview',
            path: "/overview",
            icon: <List/>
        }];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    const navigate = useNavigate();

    function handleNavigation(path: string) {
        navigate(path)
    }

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearch(event.target.value)
    }

    function openPrivateWorldMap() {
        handleMenuClose();
        handleNavigation("/overview/"+props.username+"/map")
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
                        <Button startIcon={item.icon} key={item.name}
                                onClick={() => handleNavigation(item.path)}>{item.name}</Button>
                    ))}
                    <Button startIcon={<Map/>} key={"maps-menu"} onClick={handleMenuOpen}>Maps</Button>
                    <Menu anchorEl={anchorEl}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          PaperProps={{sx:{overflow:'visible' , '&:before': {position:"absolute"}}}}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}>
                        <MenuItem onClick={openPrivateWorldMap}>Private Map</MenuItem>
                    </Menu>
                </Box>



                    <CssTextField
                        sx={{
                            mr:2
                    }}
                        className="search"
                        size="small"
                        type={"search"}
                        placeholder={"Search..."}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                        <SearchIcon color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearchText}
                    />


                <Box flexGrow={0}>
                    <Tooltip title={props.username}>
                        <Person/>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>

    )
}