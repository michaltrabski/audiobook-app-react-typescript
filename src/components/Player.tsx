import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
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
import { useAudio } from "../hooks/useAudio";
import { Badge, Paper } from "@material-ui/core";
import MySelect from "./MySelect";
import { AudioBookI } from "./FixedContainer";
import Forward10Icon from "@material-ui/icons/Forward10";
import Replay30Icon from "@material-ui/icons/Replay30";

interface Props {
  audioBook: AudioBookI;
  folderWithMp3: string;
}

const Player = (props: Props) => {
  const classes = useStyles();

  const {
    title,
    author,
    image,
    files,
    subFolder,
    allFilesDuration,
  } = props.audioBook;

  const { audioElement, state, setState, controls, ready } = useAudio(
    props.folderWithMp3,
    subFolder,
    files
  );

  const handleSliderChange = (e: any, newCurrentTime: number | number[]) => {
    let currentTime =
      newCurrentTime instanceof Array ? newCurrentTime[0] : newCurrentTime;
    setState((s) => ({ ...s, currentTime }));
    controls.seek(currentTime);
  };

  const handleClick = (step: number, direction: "LEFT" | "RIGHT") => {
    let currentTime = state.currentTime;
    if (direction === "LEFT") {
      currentTime = currentTime > step ? currentTime - step : 0;
    }
    if (direction === "RIGHT") {
      currentTime =
        state.duration > state.currentTime + step
          ? state.currentTime + step
          : state.duration;
    }
    setState((s) => ({ ...s, currentTime }));
    controls.seek(currentTime);
  };

  return (
    <Paper elevation={3} className={classes.paperRoot}>
      <div>
        <Card className={classes.cardRoot}>
          {image ? (
            <CardMedia
              className={classes.coverTop}
              image={props.folderWithMp3 + subFolder + image}
              title={title}
            />
          ) : (
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h6">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {author}
                </Typography>
              </CardContent>
            </div>
          )}
        </Card>
        <MySelect
          files={state.files}
          fileNameIndex={state.fileNameIndex}
          changeFile={controls.changeFile}
        />
        <div>
          <div className={classes.controls}>
            <IconButton
              aria-label="previous"
              onClick={() => handleClick(state.currentTime, "LEFT")}
              disabled={!ready}
            >
              <SkipPreviousIcon />
            </IconButton>

            <IconButton
              aria-label="previous"
              onClick={() => handleClick(30, "LEFT")}
              disabled={!ready}
            >
              <Replay30Icon />
            </IconButton>

            <IconButton aria-label="play/pause" disabled={!ready}>
              <BadgeLoadingInfo
                badgeContent={"Loading..."}
                invisible={ready}
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
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
              </BadgeLoadingInfo>
            </IconButton>

            <IconButton
              aria-label="next"
              onClick={() => handleClick(10, "RIGHT")}
              disabled={!ready}
            >
              <Forward10Icon />
            </IconButton>
            <IconButton
              aria-label="next"
              onClick={() => handleClick(state.duration, "RIGHT")}
              disabled={!ready}
            >
              <SkipNextIcon />
            </IconButton>
          </div>

          <Slider
            currentTime={state.currentTime}
            duration={state.duration}
            allFilesDuration={allFilesDuration}
            handleSliderChange={handleSliderChange}
            ready={ready}
            currentFileName={files[state.fileNameIndex].name}
          />

          <div>{audioElement}</div>

          {/* <pre>
            <strong>state = </strong>
            {JSON.stringify(state.fileNameIndex, null, 2)}
          </pre>
          <p>{JSON.stringify(state.currentTime, null, 2)}</p> */}

          {/* <div>
            <pre>
              <strong>state = </strong>
              {JSON.stringify({ ...state, files: [] }, null, 2)}
            </pre>
          </div> */}
          {/* <div>
            <pre>
              <strong>state = </strong>
              {JSON.stringify({ ...state }, null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </Paper>
  );
};

const BadgeLoadingInfo = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      bottom: "-7px",
      right: "50%",
    },
  })
)(Badge);

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
    coverTop: {
      width: 150,
      height: 220,
      margin: "auto",
      flexShrink: 0,
      borderRadius: theme.spacing(0.5),
    },
    cover: {
      width: 90,
      height: 130,
      flexShrink: 0,
      borderRadius: theme.spacing(0.5),
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
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    playPauseIcon: {
      height: 38,
      width: 38,
    },
  })
);

export default Player;
