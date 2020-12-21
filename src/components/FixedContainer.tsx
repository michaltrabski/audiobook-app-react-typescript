import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import Player from "./Player";
import MyCard from "./MyCard";
import { animateScroll as scroll } from "react-scroll";
import { setStorage, getStorage, mapArrayOrder } from "../utils/utils";
import Footer from "./Footer";
import { FOLDERWITHAUDIOBOOKS, limitStep } from "../settings/settings";
import Header from "./Header";

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
  audioBooksData: any;
}
export default function FixedContainer(props: Props) {
  const [limit, setLimit] = useState(5);

  const { audioBooksData } = props;

  const [audioBooks, setAudioBooks] = useState(() => {
    const audioBooksOrder = getStorage("audioBooksOrder", [""]);
    return mapArrayOrder(audioBooksData.audioBooks, audioBooksOrder, "title");
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
      <Header />

      <Container maxWidth="md">
        <Box my={2}>
          {audioBooks &&
            audioBooks
              .slice(0, limit)
              .map((book, index) => (
                <Fragment key={book.id}>
                  {index === 0 ? (
                    <Player
                      audioBook={book}
                      folderWithMp3={FOLDERWITHAUDIOBOOKS}
                    />
                  ) : (
                    <MyCard
                      index={index}
                      title={book.title}
                      available={book.available}
                      author={book.author}
                      folderWithMp3={FOLDERWITHAUDIOBOOKS}
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
            onClick={() => setLimit((limit) => limit + limitStep)}
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
