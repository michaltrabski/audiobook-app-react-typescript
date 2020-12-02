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
import { getStorageDataAsNumber, makeSlug } from "../utils/utils";
import MySkeleton from "./MySkeleton";

interface Props {
  title: string;
  image: string;
  fileNames: string[];
  folderWithMp3: string;
}
interface State {
  loadedData: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  ended: boolean;
}

const CardPlayer = (props: Props) => {
  // console.log("CardPlayer");
  const classes = useStyles();
  const theme = useTheme();

  const { title, image, fileNames, folderWithMp3 } = props;
  const fileName = fileNames[0];

  const audioRef = useRef(new Audio(folderWithMp3 + fileName));
  const audio = audioRef.current;
  console.dir(audio);

  const [state, setState] = useState<State>({
    loadedData: false,
    isPlaying: false,
    currentTime: getStorageDataAsNumber(`${title}-currentTime`, 0),
    duration: 0,
    ended: false,
  });

  const { loadedData, isPlaying, currentTime, duration, ended } = state;

  useEffect(() => {
    console.log("state useEffect");
    localStorage.setItem(
      `${title}-currentTime`,
      JSON.stringify(state.currentTime)
    );
  }, [state.currentTime]);

  useEffect(() => {
    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audio.src]);

  const onLoadedData = () => {
    setState((s) => ({
      ...s,
      loadedData: true,
      duration: Math.floor(audio.duration),
    }));
    audio.currentTime = currentTime;
    console.log("loadeddata");
  };

  const onTimeUpdate = () => {
    setState((s) => ({ ...s, currentTime: Math.floor(audio.currentTime) }));
    console.log("timeupdate", Math.floor(audio.currentTime));
  };

  const onEnded = () => {
    setState((s) => ({ ...s, isPlaying: false, ended: true }));
    console.log("ended");
  };

  const play = () => {
    audio.currentTime = currentTime;
    if (ended) audio.currentTime = 0;
    audio.play();
    setState((s) => ({ ...s, isPlaying: true, ended: false }));
  };

  const pause = () => {
    audio.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  };

  const handleSliderChange = (e: any, newCurrentTime: number | number[]) => {
    const currentTime =
      newCurrentTime instanceof Array ? newCurrentTime[0] : newCurrentTime;

    audio.currentTime = currentTime;

    setState((s) => ({ ...s, currentTime: Math.floor(currentTime) }));

    audio.play();
    console.log(currentTime);
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
        <Typography variant="body2" color="textSecondary" component="p">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Typography>
        {loadedData ? (
          <>
            <div className={classes.controls}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="play/pause"
                onClick={state.isPlaying ? pause : play}
              >
                {state.isPlaying ? (
                  <PauseIcon className={classes.playPauseIcon} />
                ) : (
                  <PlayArrowIcon className={classes.playPauseIcon} />
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
            <CustomizedSlider
              currentTime={currentTime}
              duration={duration}
              handleSliderChange={handleSliderChange}
            />
            {/* <div>
              <audio src={folderWithMp3 + fileName} controls></audio>
            </div> */}
          </>
        ) : (
          <MySkeleton />
        )}
      </CardContent>

      {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
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

export default CardPlayer;
