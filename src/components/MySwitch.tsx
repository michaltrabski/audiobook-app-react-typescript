import React from "react";
import Switch from "@material-ui/core/Switch";
import { Box } from "@material-ui/core";

export default function MySwith() {
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      Dark theme
      <Switch
        checked={state.checked}
        onChange={handleChange}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </Box>
  );
}
