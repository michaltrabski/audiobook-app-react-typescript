import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "./Slider";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import { makeSlug } from "../utils/utils";
import MySkeleton from "./MySkeleton";
import { useAudio } from "../hooks/useAudio";
import { CircularProgress } from "@material-ui/core";

interface Props {
  title: string;
  image: string;
  fileNames: string[];
  folderWithMp3: string;
}

const Player = (props: Props) => {
  // console.log("CardPlayer");
  const classes = useStyles();
  const theme = useTheme();

  const { title, image, fileNames, folderWithMp3 } = props;

  const { audioElement, state, setState, controls } = useAudio(
    folderWithMp3,
    fileNames
  );
  // console.log("audioElement = ", audioElement);
  // console.log("state = ", state);
  // console.log("controls = ", controls);

  const handleSliderChange = (e: any, newCurrentTime: number | number[]) => {
    let currentTime =
      newCurrentTime instanceof Array ? newCurrentTime[0] : newCurrentTime;

    console.log(currentTime);
    setState((s) => ({ ...s, currentTime }));
    controls.seek(currentTime);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={folderWithMp3 + image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
        <pre>
          <strong>state = </strong>
          {JSON.stringify(state, null, 2)}
        </pre>

        <div>
          <Slider
            currentTime={state.currentTime}
            duration={state.duration}
            handleSliderChange={handleSliderChange}
          />
        </div>

        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton color="primary" aria-label="play/pause">
            {state.waiting ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                {state.paused ? (
                  <PlayArrowIcon
                    onClick={() => controls.play()}
                    className={classes.playPauseIcon}
                  />
                ) : (
                  <PauseIcon
                    onClick={() => controls.pause()}
                    className={classes.playPauseIcon}
                  />
                )}
              </>
            )}
          </IconButton>

          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>

        <div>{audioElement}</div>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 700,
      marginBottom: theme.spacing(2),
    },
    media: {
      height: 200,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playPauseIcon: {
      height: 38,
      width: 38,
    },
  })
);

export default Player;
