import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FixedContainer from "./components/FixedContainer";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
    // primary: {
    //   light: "#757ce8",
    //   main: "#3f50b5",
    //   dark: "#002884",
    //   contrastText: "#fff",
    // },
    // secondary: {
    //   light: "#ff7961",
    //   main: "#f44336",
    //   dark: "#ba000d",
    //   contrastText: "#000",
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FixedContainer />
    </ThemeProvider>
  );
}

export default App;
