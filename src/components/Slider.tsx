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
  currentTime: number;
  duration: number;
  handleSliderChange: (e: any, newCurrentTime: number | number[]) => void;
}

export default function RangeSlider(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={Math.floor(props.currentTime)}
        onChange={(e, newCurrentTime) =>
          props.handleSliderChange(e, newCurrentTime)
        }
        valueLabelDisplay="on"
        aria-labelledby="slider"
        max={Math.floor(props.duration)}
        valueLabelFormat={() => convertSeconds(props.currentTime)}
      />
    </div>
  );
}
