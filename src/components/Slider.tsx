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
import { Box, Button, IconButton } from "@material-ui/core";
import AccessAlarmsTwoToneIcon from "@material-ui/icons/AccessAlarmsTwoTone";
import SpeedTwoToneIcon from "@material-ui/icons/SpeedTwoTone";

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

      <Box className={classes.flex} pb={1}>
        <IconButton>
          <AccessAlarmsTwoToneIcon />
        </IconButton>
        <Box>
          <Button>{convertSeconds(props.currentTime)}</Button>
          <span> / </span>
          <Button>{convertSeconds(props.duration)}</Button>
        </Box>

        <IconButton>
          <SpeedTwoToneIcon />
        </IconButton>
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

      // paddingTop: theme.spacing(3),
      // paddingBottom: theme.spacing(2),
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
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
