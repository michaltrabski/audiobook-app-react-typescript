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
}

export default function RangeSlider(props: Props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState<number[]>([0]);

  // const handleChange = (event: any, newValue: number | number[]) => {
  //   setValue(newValue as number[]);
  // };

  return (
    <div className={classes.root}>
      <Slider
        value={props.currentTime}
        // onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={props.duration}
      />
    </div>
  );
}
