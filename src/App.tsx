import React, { createContext, useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FixedContainer from "./components/FixedContainer";
import { CssBaseline } from "@material-ui/core";
import { ENDPOINT } from "./settings/settings";
import LoadingScreen from "./components/LoadingScreen";
import axios from "axios";

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
  const [audioBooksData, setAudioBooksData] = useState({});

  useEffect(() => {
    axios
      .get(ENDPOINT)
      // .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
        // console.log(JSON.stringify(res.data));
        setAudioBooksData((s) => ({ ...s, ...res.data }));
      });
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Context.Provider value={{ darkMode, setDarkMode }}>
        <CssBaseline />

        {Object.keys(audioBooksData).length > 0 ? (
          <FixedContainer
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            audioBooksData={audioBooksData}
          />
        ) : (
          <LoadingScreen />
        )}
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
