import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardPlayer from "./CardPlayer";
import data from "../data/data.json";

export default function FixedContainer() {
  const { folderWithMp3, audioBooks } = data;
  console.log({ folderWithMp3, audioBooks });
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        {audioBooks.map((book, i) => (
          <Fragment>
            <CardPlayer
              title={book.title}
              fileNames={book.fileNames}
              folderWithMp3={folderWithMp3}
            />{" "}
          </Fragment>
        ))}
      </Container>
    </React.Fragment>
  );
}
