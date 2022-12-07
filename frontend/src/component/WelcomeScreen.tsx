import './Welcome.css';
import {Box, IconButton} from "@mui/material";
import {AddSharp, LoginSharp} from "@mui/icons-material";

export default function WelcomeScreen() {
    return (


        <div className="content">
            <div className="content__container">
                <p className="content__container__text">
                    Hello
                </p>

                <ul className="content__container__list">
                    <li className="content__container__list__item">world</li>

                    <li className="content__container__list__item">travellers</li>

                </ul>
            </div>
            <Box sx={{mt:4}}>
                <IconButton sx={{ml:14}} size= "large"  color={"secondary"} type={"submit"}>
                    <AddSharp />
                </IconButton>

                <IconButton size= "large" type={"submit"} color={"secondary"}>
                    <LoginSharp />
                </IconButton>
            </Box>


        </div>)
}