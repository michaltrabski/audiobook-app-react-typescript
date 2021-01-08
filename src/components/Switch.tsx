import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Box, IconButton } from "@material-ui/core";
import { Context } from "../App";
import _ from "lodash";
import Brightness3TwoToneIcon from "@material-ui/icons/Brightness3TwoTone";

export default function MySwith() {
  const { darkMode, setDarkMode } = useContext(Context);

  const handleChange = () => {
    setDarkMode((darkMode: boolean) => !darkMode);
  };

  const color = darkMode ? "secondary" : "inherit";
  return (
    <Box>
      {/* {darkMode ? "Dark" : "Light"} theme */}

      {/* <Switch
        checked={darkMode}
        onClick={handleChange}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
      /> */}

      <IconButton onClick={handleChange}>
        <Brightness3TwoToneIcon color={color} />
      </IconButton>
    </Box>
  );
}
