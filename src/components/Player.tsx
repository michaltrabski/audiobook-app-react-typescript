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
import { CircularProgress, Grid, Paper } from "@material-ui/core";
import MySelect from "./MySelect";

interface Props {
  title: string;
  author: string;
  image: string;
  fileNames: string[];
  folderWithMp3: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperRoot: {
      marginBottom: theme.spacing(2),
    },
    cardRoot: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      boxShadow: "none",
    },
    cardActionArea: {
      display: "flex",
      justifyContent: "flex-start",
      // alignItems: "flex-start",
    },
    media: {
      height: 200,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 90,
      height: 130,
      flexShrink: 0,
      borderRadius: theme.spacing(0.5),
    },
    controls: {
      display: "flex",
      alignItems: "center",
      // paddingLeft: theme.spacing(1),
      // paddingBottom: theme.spacing(1),
      // backgroundColor: "red",
      justifyContent: "space-between",
    },
    playPauseIcon: {
      height: 38,
      width: 38,
    },
  })
);

const Player = (props: Props) => {
  // console.log("CardPlayer");
  const classes = useStyles();
  const theme = useTheme();

  const { title, author, image, fileNames, folderWithMp3 } = props;

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
    setState((s) => ({ ...s, currentTime }));
    controls.seek(currentTime);
  };

  return (
    <Paper elevation={3} className={classes.paperRoot}>
      <div>
        <Card className={classes.cardRoot}>
          <div className={classes.cardActionArea}>
            <CardMedia
              className={classes.cover}
              image={folderWithMp3 + image}
              title={title}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h6">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {author}
                </Typography>
                <MySelect
                  fileNames={state.fileNames}
                  fileNameIndex={state.fileNameIndex}
                  changeFile={controls.changeFile}
                />
              </CardContent>
            </div>
          </div>
        </Card>

        <div>
          <Slider
            currentTime={state.currentTime}
            duration={state.duration}
            handleSliderChange={handleSliderChange}
          />

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

          {/* <div>
            <pre>
              <strong>state = </strong>
              {JSON.stringify(state, null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </Paper>
  );
};

export default Player;
