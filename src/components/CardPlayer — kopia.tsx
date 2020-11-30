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
  name: string;
  currentIndexFile: number;
  currentPlayTime: number;
  isPlaying: boolean;
}

function reducer(state: State, action: any) {
  switch (action.type) {
    case "START_PLAYING":
      state = { ...state, isPlaying: true };
      return state;

    case "PAUSE_PLAYING":
      state = { ...state, isPlaying: false };
      return state;

    case "NEXT_FILE":
      state = { ...state, currentIndexFile: state.currentIndexFile + 1 };
      return state;

    default:
      throw new Error();
  }
}

const CardPlayer = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [xxx, setXxx] = useState({
    audio: new Audio(),
  });

  useEffect(() => {
    setXxx((xxx) => {
      xxx.audio.src = folderWithMp3 + fileNames[state.currentIndexFile];
      xxx.audio.autoplay = true;
      return xxx;
    });
  }, []);

  console.log("xxx = ", xxx);

  const [audio, setAudio] = useState(document.createElement("audio"));
  // console.log("1", audio);

  const { title, fileNames, folderWithMp3 } = props;

  const [state, dispatch] = useReducer(reducer, {
    name: makeSlug(title),
    currentIndexFile: 0,
    currentPlayTime: 0,
    isPlaying: false,
  });

  const play = () => {
    // audio.src = folderWithMp3 + fileNames[state.currentIndexFile];
    setAudio((audio) => {
      audio.src = folderWithMp3 + fileNames[state.currentIndexFile];
      return audio;
    });

    audio.play();
    dispatch({ type: "START_PLAYING" });

    // const interval = setInterval(() => {
    //   const currentPlayTime = Math.floor(audio.currentTime);
    //   console.log("xxxxxxxxxxxxxxx", interval, currentPlayTime);
    // }, 1000);

    audio.addEventListener("loadeddata", function (e) {
      console.log(this.duration);
    });

    audio.addEventListener("ended", function (e) {
      dispatch({ type: "NEXT_FILE" });
    });
  };

  const pause = () => {
    audio.pause();
    dispatch({ type: "PAUSE_PLAYING" });
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
