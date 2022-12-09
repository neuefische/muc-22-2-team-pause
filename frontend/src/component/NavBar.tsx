import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    styled,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import React, {ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {Home, List, Person, PersonAdd, Public} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';

type NavBarProps = {
    username:string
    handleSearch(searchText: string): void
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
            path: "/signup",
            icon: <PersonAdd/>
        }, {
            name: 'Overview',
            path: "/overview",
            icon:<List/>
        }];



    const TextFieldStyle = styled(TextField)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const navigate = useNavigate();

    function handleNavigation(path: string) {
        navigate(path)
    }

    function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearch(event.target.value)
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

                    <TextField
                        color="secondary"
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