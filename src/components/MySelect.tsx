import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Box, IconButton } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { FileI } from "./FixedContainer";

interface Props {
  files: FileI[];
  fileNameIndex: number;
  changeFile: (fileNameIndex: number) => void;
}

export default function MySelect(props: Props) {
  const classes = useStyles();
  const { files, fileNameIndex, changeFile } = props;
  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    changeFile(e.target.value as number);
  };

  const handleClick = (newFileNameIndex: number) => {
    // console.log(newFileNameIndex);
    changeFile(newFileNameIndex);
  };

  return (
    <Box className={classes.root}>
      {files.length > 1 && (
        <IconButton
          disabled={fileNameIndex === 0 ? true : false}
          aria-label="previes"
          onClick={() => handleClick(fileNameIndex - 1)}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}
      <FormControl className={classes.formControl}>
        <Select
          value={fileNameIndex}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          {files.map((file, i) => (
            <MenuItem className={classes.menuItem} key={file.mp3} value={i}>
              {file.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {files.length > 1 && (
        <IconButton
          disabled={fileNameIndex === files.length - 1 ? true : false}
          aria-label="next"
          onClick={() => handleClick(fileNameIndex + 1)}
        >
          <NavigateNextIcon />
        </IconButton>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: theme.spacing(0),
      // backgroundColor: "red",
      justifyContent: "space-between",
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
    },
    selectEmpty: {
      // marginTop: theme.spacing(2),
    },
    menuItem: {
      whiteSpace: "normal",
    },
  })
);
