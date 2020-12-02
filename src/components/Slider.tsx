import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { convertSeconds } from "../utils/utils";

const useStyles = makeStyles({
  root: {
    // width: "100%",
  },
});

interface Props {
  time: number;
  duration: number;
  handleSliderChange: (a: any, b: number | number[]) => void;
}

export default function RangeSlider(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={Math.floor(props.time)}
        onChange={(e, newtime) => props.handleSliderChange(e, newtime)}
        valueLabelDisplay="on"
        aria-labelledby="slider"
        max={Math.floor(props.duration)}
        valueLabelFormat={() => convertSeconds(props.time)}
      />
    </div>
  );
}
