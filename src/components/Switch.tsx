import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Box } from "@material-ui/core";
import { Context } from "../App";
import _ from "lodash";

export default function MySwith() {
  const { darkMode, setDarkMode } = useContext(Context);

  const handleChange = () => {
    let go = true;

    // write debounce function

    console.log("onTouchStart");
    setDarkMode((darkMode: boolean) => !darkMode);
  };
  return (
    <Box>
      {/* {darkMode ? "Dark" : "Light"} theme */}
      <Switch
        checked={darkMode}
        onChange={handleChange}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
        onTouchStart={handleChange}
      />
    </Box>
  );
}
