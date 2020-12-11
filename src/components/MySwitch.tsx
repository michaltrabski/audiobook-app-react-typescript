import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Box } from "@material-ui/core";
import { Context } from "../App";

export default function MySwith() {
  const { darkMode, setDarkMode } = useContext(Context);

  return (
    <Box>
      {/* {darkMode ? "Dark" : "Light"} theme */}
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </Box>
  );
}
