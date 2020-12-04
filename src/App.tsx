import React, { createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FixedContainer from "./components/FixedContainer";
import { CssBaseline } from "@material-ui/core";

const lightTheme = createMuiTheme({
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
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
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

export const Context = createContext<any>({});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Context.Provider value={{ darkMode, setDarkMode }}>
        <CssBaseline />
        <FixedContainer darkMode={darkMode} setDarkMode={setDarkMode} />
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
