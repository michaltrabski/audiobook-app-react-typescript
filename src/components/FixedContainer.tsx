import React, { Fragment, useEffect, useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardPlayer from "./CardPlayer";
import data from "../data/data.json";
import { Button } from "@material-ui/core";
import Player from "./Player";

export default function FixedContainer() {
  const [limit, setLimit] = useState(1);
  const { folderWithMp3, audioBooks } = data;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
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

        <Button onClick={() => setLimit(limit + 1)}>Show more</Button>
      </Container>
    </React.Fragment>
  );
}
