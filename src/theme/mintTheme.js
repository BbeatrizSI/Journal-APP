import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const mintTheme = createTheme({
    palette: {
        primary: {
            main: '#55c49c'
        },
        secondary: {
            main: '#c4557d'
        },
        error: {
            main: red.A400
        }
    }
})