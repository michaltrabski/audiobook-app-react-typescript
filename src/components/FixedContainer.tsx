import React, { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import data from "../data/data.json";
import { Box, Button } from "@material-ui/core";
import Player from "./Player";
import HideAppBar from "./HideAppBar";
import MyCard1 from "./MyCard1";
import { animateScroll as scroll } from "react-scroll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    media: {
      height: 100,
    },
  })
);

interface Props {
  darkMode: boolean;
  setDarkMode: (a: boolean) => void;
}
export default function FixedContainer(props: Props) {
  const classes = useStyles();
  const [limit, setLimit] = useState(8);
  const [audioBooks, setAudioBooks] = useState(data.audioBooks);

  const handleClick = (index: number) => {
    const changedArr = [...audioBooks];
    changedArr.splice(index, 1);
    setAudioBooks((s) => [audioBooks[index], ...changedArr]);
    scroll.scrollToTop();
  };
  return (
    <>
      <HideAppBar>
        <></>
      </HideAppBar>

      <Container fixed>
        <Box my={2}>
          {audioBooks.slice(0, limit).map((book, index) => (
            <Fragment key={book.title}>
              {index === 0 ? (
                <Player
                  title={book.title}
                  author={book.author}
                  fileNames={book.fileNames}
                  folderWithMp3={data.folderWithMp3}
                  image={book.image}
                />
              ) : (
                <div onClick={() => handleClick(index)}>
                  <MyCard1
                    title={book.title}
                    author={book.author}
                    folderWithMp3={data.folderWithMp3}
                    image={book.image}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </Box>
        {limit < audioBooks.length ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => setLimit(limit + 10)}
          >
            Show more {audioBooks.length} {limit}
          </Button>
        ) : (
          <Typography variant="subtitle1" color="textSecondary" align="center">
            There is no more audiobooks...
          </Typography>
        )}
        <button onClick={() => props.setDarkMode(!props.darkMode)}>
          {JSON.stringify(props.darkMode)}
        </button>
      </Container>
    </>
  );
}
