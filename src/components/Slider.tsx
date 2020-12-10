import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { convertSeconds } from "../utils/utils";
import { Box, Button } from "@material-ui/core";

interface Props {
  currentTime: number;
  duration: number;
  allFilesDuration: number;
  ready: boolean;
  handleSliderChange: (e: any, newCurrentTime: number | number[]) => void;
}

export default function RangeSlider(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        className={classes.sliderLabel}
        value={Math.floor(props.currentTime)}
        onChange={(e, newCurrentTime) =>
          props.handleSliderChange(e, newCurrentTime)
        }
        valueLabelDisplay="auto"
        aria-labelledby="slider"
        max={Math.floor(props.duration)}
        valueLabelFormat={() => convertSeconds(props.currentTime)}
        disabled={!props.ready}
      />
      <Box className={classes.center}>
        <Button>{convertSeconds(props.currentTime)}</Button>
        <span> / </span>
        <Button>{convertSeconds(props.duration)}</Button>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: "100%",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),

      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(0),
    },
    center: {
      textAlign: "center",
    },
    sliderLabel: {
      "& > span > span > span ": {
        backgroundColor: "transparent",
      },
      "& > span > span > span > span": {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.25),
        borderRadius: theme.spacing(0.25),
      },
    },
  })
);
