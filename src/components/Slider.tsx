import React, { useState, useEffect, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { convertSeconds, getStorage, setStorage } from "../utils/utils";
import { Badge, Box, Button, IconButton } from "@material-ui/core";
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
  const time = useRef(0);
  const prevTime = useRef(0);

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
    prevTime.current = currentTime;
  });

  useEffect(() => {
    const marksStep = 7 * 60;
    time.current++;
    if (Math.abs(currentTime - prevTime.current) > marksStep) time.current = 1;

    const markValue = Math.floor(currentTime);
    const isMark = marks.find((mark) => mark.value === markValue);
    if (isMark) time.current = 1;

    if ((time.current + 1) % marksStep === 0) {
      setMarks([...marks, { value: markValue }]);
      setStorage(`marks-${currentFileName}`, marks);
    }
  }, [currentTime]);

  useEffect(() => {
    const marks = getStorage(`marks-${currentFileName}`, []);
    setMarks(marks);
    time.current = 1;
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
        <IconButton onClick={handleClick} color="primary">
          <Badge badgeContent={convertSeconds(60 * 30)} color="secondary">
            <HourglassEmptyIcon />
          </Badge>
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
