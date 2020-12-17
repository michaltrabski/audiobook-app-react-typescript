import React, { useState, useEffect, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { convertSeconds, getStorage, setStorage } from "../utils/utils";
import { Box, Button, IconButton } from "@material-ui/core";
import SpeedTwoToneIcon from "@material-ui/icons/SpeedTwoTone";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import Snack from "./Snack";

interface Props {
  currentTime: number;
  duration: number;
  allFilesDuration: number;
  ready: boolean;
  currentFileName: string;
  handleSliderChange: (e: any, newCurrentTime: number | number[]) => void;
}

type Mark = {
  value: number;
};

export default function RangeSlider(props: Props) {
  const classes = useStyles();
  const [snackOpen, setSnackOpen] = useState(false);
  const [marks, setMarks] = useState<Mark[] | []>([]);
  const marksRef = useRef(0);
  const {
    currentTime,
    duration,
    ready,
    currentFileName,
    handleSliderChange,
  } = props;

  const handleClick = () => {
    setSnackOpen(true);
  };

  useEffect(() => {
    const time = marksRef.current;
    marksRef.current = time + 1;

    if ((time + 1) % (60 * 5) === 0) {
      setMarks([...marks, { value: Math.floor(currentTime) }]);
      setStorage(`marks-${currentFileName}`, marks);
    }
  }, [currentTime]);

  useEffect(() => {
    const marks = getStorage(`marks-${currentFileName}`, []);
    setMarks(marks);
  }, [currentFileName]);

  return (
    <div className={classes.root}>
      <Slider
        className={classes.sliderLabel}
        value={Math.floor(currentTime)}
        onChange={(e, newCurrentTime) => handleSliderChange(e, newCurrentTime)}
        valueLabelDisplay="auto"
        aria-labelledby="slider"
        max={Math.floor(duration)}
        valueLabelFormat={() => convertSeconds(currentTime)}
        disabled={!ready}
        marks={marks}
        color="primary"
      />
      <Box className={classes.flex} pb={1}>
        <IconButton onClick={handleClick}>
          <HourglassEmptyIcon />
        </IconButton>
        <Box>
          <Button>{convertSeconds(currentTime)}</Button>
          <span> / </span>
          <Button>{convertSeconds(duration)}</Button>
        </Box>

        <IconButton onClick={handleClick}>
          <SpeedTwoToneIcon />
        </IconButton>
      </Box>

      <Snack snackOpen={snackOpen} setSnackOpen={setSnackOpen} />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
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
