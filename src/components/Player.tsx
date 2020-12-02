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
import CustomizedSlider from "./CustomizedSlider";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import { makeSlug } from "../utils/utils";
import MySkeleton from "./MySkeleton";
import { useAudio } from "../hooks/useAudio";

interface Props {
  title: string;
  image: string;
  fileNames: string[];
  folderWithMp3: string;
}
interface State {
  audio: HTMLAudioElement;
  loadedData: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  ended: boolean;
}

const Player = (props: Props) => {
  // console.log("CardPlayer");
  const classes = useStyles();
  const theme = useTheme();

  const { title, image, fileNames, folderWithMp3 } = props;

  const { audioElement, state, controls } = useAudio(
    folderWithMp3 + fileNames[0]
  );
  console.log("audioElement = ", audioElement);
  console.log("state = ", state);
  console.log("controls = ", controls);

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
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
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
