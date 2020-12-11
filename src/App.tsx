import React, { createContext, useEffect, useState } from "react";
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
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export const Context = createContext<any>({});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState({ whereFrom: "fetched data" });

  useEffect(() => {
    fetch("https://poznaj-testy.hekko24.pl/cors/")
      .then((res) => res.json())
      .then((newData) => {
        console.log("xxxxxxxxx", newData);

        setData((data) => ({ ...data, ...newData }));
      });
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Context.Provider value={{ darkMode, setDarkMode }}>
        <CssBaseline />
        <FixedContainer darkMode={darkMode} setDarkMode={setDarkMode} />
        {JSON.stringify(data)}
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
