import React, { Fragment, useEffect, useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import data from "../data/data.json";
import { Box, Button } from "@material-ui/core";
import Player from "./Player";
import HideAppBar from "./HideAppBar";

interface Props {
  darkMode: boolean;
  setDarkMode: (a: boolean) => void;
}
export default function FixedContainer(props: Props) {
  const [limit, setLimit] = useState(1);
  const { folderWithMp3, audioBooks } = data;

  return (
    <>
      <HideAppBar>
        <></>
      </HideAppBar>
      <button onClick={() => props.setDarkMode(!props.darkMode)}>
        {JSON.stringify(props.darkMode)}
      </button>
      <Container fixed>
        <Box my={2}>
          {audioBooks.slice(0, limit).map((book, i) => (
            <Fragment>
              {/* <CardPlayer
              title={book.title}
              fileNames={book.fileNames}
              folderWithMp3={folderWithMp3}
              image={book.image}
            /> */}
              <Player
                title={book.title}
                fileNames={book.fileNames}
                folderWithMp3={folderWithMp3}
                image={book.image}
              />
            </Fragment>
          ))}
        </Box>

        <Button onClick={() => setLimit(limit + 1)}>Show more</Button>
      </Container>
    </>
  );
}
