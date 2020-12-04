import React from "react";
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
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    cardActionArea: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 115,
      minHeight: 170,
      flexShrink: 0,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

interface Props {
  title: string;
  author: string;
  image: string;
  folderWithMp3: string;
}

export default function MyCard1(props: Props) {
  const classes = useStyles();

  const { title, folderWithMp3, image, author } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
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
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
