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

interface Props {
  title: string;
  fileNames: string[];
  folderWithMp3: string;
}
interface State {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  ended: boolean;
}

const CardPlayer = (props: Props) => {
  console.log("CardPlayer");
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = useState<State>({
    audio: new Audio(),
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    ended: false,
  });

  const { title, fileNames, folderWithMp3 } = props;
  const { audio, isPlaying, currentTime, duration, ended } = state;

  useEffect(() => {
    // setState((s) => {
    //   const newAudio = new Audio(folderWithMp3 + fileNames[0]);
    //   return { ...s, audio: newAudio };
    // });

    setState((state) => {
      state.audio.src = folderWithMp3 + fileNames[0];
      state.audio.autoplay = false;
      return state;
    });

    audio.addEventListener("loadeddata", (e) => {
      setState((s) => ({ ...s, duration: Math.floor(s.audio.duration) }));
    });

    audio.addEventListener("timeupdate", (e) => {
      setState((s) => ({ ...s, currentTime: Math.floor(audio.currentTime) }));
      // console.log("xxxxxxxxxx");
    });

    audio.addEventListener("ended", (e) => {
      setState((s) => ({ ...s, isPlaying: false, ended: true }));
    });
  }, [audio.src]);

  useEffect(() => {
    // console.log("duration", duration);
  }, [duration]);

  useEffect(() => {
    // console.log("currentTime", currentTime);
  }, [currentTime]);

  // console.log("state = ", state, state.audio);
  // console.dir(state.audio);

  const play = () => {
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
    setState((s) => ({ ...s, currentTime, isPlaying: true, ended: false }));
    audio.currentTime = currentTime;
    audio.play();
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Typography>

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
      height: 1,
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
