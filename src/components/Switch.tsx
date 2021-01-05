import React, { useContext, useRef } from "react";
import Switch from "@material-ui/core/Switch";
import { Box } from "@material-ui/core";
import { Context } from "../App";
import _ from "lodash";

type Timeout = ReturnType<typeof setTimeout>;

export default function MySwith() {
  const { darkMode, setDarkMode } = useContext(Context);
  const timeout = useRef<Timeout | null>(null);

  const handleChange = () => {
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setDarkMode((darkMode: boolean) => !darkMode);
    }, 70);

    return () => timeout.current && clearTimeout(timeout.current);
  };

  return (
    <Box>
      {/* {darkMode ? "Dark" : "Light"} theme */}
      <Switch
        checked={darkMode}
        onClick={() => {
          console.log("onClick", new Date().getTime());
          handleChange();
        }}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
        onTouchStart={() => {
          console.log("onTouchStart", new Date().getTime());
          handleChange();
        }}
      />
    </Box>
  );
}
