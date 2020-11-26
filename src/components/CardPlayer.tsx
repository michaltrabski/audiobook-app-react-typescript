import React, { useEffect, useRef, useState } from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginBottom: theme.spacing(3),
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

interface Props {
  title: string;
  fileNames: string[];
  folderWithMp3: string;
}
const CardPlayer = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState("");

  const audioRef = useRef<null | HTMLAudioElement>(null);
  console.log(audioRef, audioRef.current);

  useEffect(() => {
    audioRef.current = document.createElement("audio");
    console.log(audioRef, audioRef.current);
  }, []);

  const { title, fileNames, folderWithMp3 } = props;

  const play = () => {
    console.log("1play", audioRef.current);
    if (audioRef.current) {
      audioRef.current.src = folderWithMp3 + fileNames[0];

      setCurrentFile(fileNames[0]);
      // audio.currentTime = 1;

      audioRef.current.play();

      setIsPlaying(true);

      audioRef.current.addEventListener("loadeddata", function (e) {
        console.log(this.duration);
      });

      audioRef.current.addEventListener("ended", function (e) {
        console.log("koniec");
        setIsPlaying(false);
      });
    }
    console.log("2play", audioRef.current);
  };

  const pause = () => {
    console.log("pause", audioRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            currentFile = {currentFile}
          </Typography>
          <p>{JSON.stringify(fileNames)}</p>

          <p>{folderWithMp3}</p>
        </CardContent>
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
            onClick={isPlaying ? pause : play}
          >
            {isPlaying ? (
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
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
};

export default CardPlayer;
