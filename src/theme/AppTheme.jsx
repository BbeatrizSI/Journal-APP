import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { mintTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ mintTheme }>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
