import React, { useContext, useState } from "react";
import { Badge, Box, Button, IconButton } from "@material-ui/core";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { convertSeconds } from "../utils/utils";

export default function Timer() {
  const [time, setTime] = useState(200);

  return (
    <IconButton color="primary">
      <Badge badgeContent={convertSeconds(time)} color="secondary">
        <HourglassEmptyIcon />
      </Badge>
    </IconButton>
  );
}
