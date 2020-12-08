import React, { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import data from "../data/audioBooks.json";
import { Box, Button } from "@material-ui/core";
import Player from "./Player";
import HideAppBar from "./HideAppBar";
import MyCard from "./MyCard";
import { animateScroll as scroll } from "react-scroll";
import { v4 as uuidv4 } from "uuid";
import { setStorage, getStorage, mapArrayOrder } from "../utils/utils";
import Footer from "./Footer";

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

export interface FileI {
  name: string;
  mp3: string;
  duration: number;
}
export interface AudioBookI {
  title: string;
  id: string;
  available: boolean;
  author: string;
  image: string;
  allFilesDuration: number;
  subFolder: string;
  files: FileI[];
}

interface Props {
  darkMode: boolean;
  setDarkMode: (a: boolean) => void;
}
export default function FixedContainer(props: Props) {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [audioBooks, setAudioBooks] = useState(() => {
    const audioBooksOrder = getStorage("audioBooksOrder", [""]);
    return mapArrayOrder(data.audioBooks, audioBooksOrder, "title");
  });

  useEffect(() => {
    // remember audioBooks array order by title
    const audioBooksOrder = audioBooks.map((book) => book.title);
    setStorage("audioBooksOrder", audioBooksOrder);
  });

  const listenAudioBook = (index: number) => {
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

      <Container maxWidth="md">
        <Box my={2}>
          {audioBooks.slice(0, limit).map((book, index) => (
            <Fragment key={book.id}>
              {index === 0 ? (
                <Player audioBook={book} folderWithMp3={data.folderWithMp3} />
              ) : (
                <MyCard
                  index={index}
                  title={book.title}
                  available={book.available}
                  author={book.author}
                  folderWithMp3={data.folderWithMp3}
                  subFolder={book.subFolder}
                  image={book.image}
                  listenAudioBook={listenAudioBook}
                />
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
            Show more
          </Button>
        ) : (
          <Typography variant="subtitle1" color="textSecondary" align="center">
            There is no more audiobooks...
          </Typography>
        )}
      </Container>
      <Footer />
    </>
  );
}
