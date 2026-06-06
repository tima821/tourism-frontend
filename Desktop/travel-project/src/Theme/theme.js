import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d2ff" },
    secondary: { main: "#9d50bb" },
    background: { default: "#0a1929", paper: "#132f4c" },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});

export default theme;
