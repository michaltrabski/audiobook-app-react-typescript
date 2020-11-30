import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  currentTime: number;
  duration: number;
  handleSliderChange: (a: any, b: number | number[]) => void;
}

export default function RangeSlider(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={props.currentTime}
        onChange={(e, newCurrentTime) =>
          props.handleSliderChange(e, newCurrentTime)
        }
        valueLabelDisplay="auto"
        aria-labelledby="slider"
        max={props.duration}
      />
    </div>
  );
}
