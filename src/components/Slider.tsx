import React, { useState, useEffect, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { convertSeconds, getStorage, setStorage } from "../utils/utils";
import { Badge, Box, Button, IconButton } from "@material-ui/core";
import SpeedTwoToneIcon from "@material-ui/icons/SpeedTwoTone";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import Snack from "./Snack";
import Timer from "./Timer";
import { marksStep } from "../settings/settings";
import LinkIcon from "@material-ui/icons/Link";

interface Props {
  currentTime: number;
  duration: number;
  allFilesDuration: number;
  ready: boolean;
  currentFileName: string;
  handleSliderChange: (e: any, newCurrentTime: number | number[]) => void;
  pause: () => void;
  src: string;
}

type Mark = {
  value: number;
};

export default function RangeSlider(props: Props) {
  const classes = useStyles();
  const [snackOpen, setSnackOpen] = useState(false);
  const [marks, setMarks] = useState<Mark[] | []>([]);
  const timer = useRef(0);
  const prevCurrentTime = useRef(0);

  const {
    currentTime,
    duration,
    ready,
    currentFileName,
    handleSliderChange,
    pause,
    src,
  } = props;

  const handleClick = () => {
    setSnackOpen(true);
  };

  useEffect(() => {
    timer.current++;

    if (Math.abs(currentTime - prevCurrentTime.current) > marksStep) {
      timer.current = 0;
    }
    // console.log(currentTime, prevCurrentTime.current, timer.current);

    // if there is allready mark dont save it again
    const markValue = Math.floor(currentTime);
    const isMark = marks.find((mark) => mark.value === markValue);
    if (isMark) timer.current = 0;

    // console.log(`${timer.current % marksStep}             ${timer.current}`);

    if (timer.current % marksStep === 0 && timer.current !== 0) {
      timer.current = 0;
      setMarks([...marks, { value: markValue }]);

      // console.log(` ${isMark ? "saved" : null} `);
    }
    // console.log(`timer=${timer.current} time=${markValue}`);
  }, [currentTime]);

  useEffect(() => {
    prevCurrentTime.current = currentTime;
  });

  useEffect(() => {
    const marks = getStorage(`marks-${currentFileName}`, []);
    setMarks(marks);
    timer.current = 0;
  }, [currentFileName]);

  useEffect(() => {
    // console.log("marks changed");
    setStorage(`marks-${currentFileName}`, marks);
  }, [marks]);

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
        <Timer pause={pause} />

        <Box>
          <Button>{convertSeconds(currentTime)}</Button>
          <span> / </span>
          <Button>{convertSeconds(duration)}</Button>
        </Box>
        <Box>
          <IconButton href={src} target="_blank" rel="noreferrer noopener">
            <LinkIcon />
          </IconButton>

          <IconButton onClick={handleClick}>
            <SpeedTwoToneIcon />
          </IconButton>
        </Box>
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
