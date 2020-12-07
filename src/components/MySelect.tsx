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
  })
);

interface Props {
  fileNames: string[];
  fileNameIndex: number;
  changeFile: (fileNameIndex: number) => void;
}

export default function MySelect(props: Props) {
  const classes = useStyles();
  const { fileNames, fileNameIndex, changeFile } = props;
  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    changeFile(e.target.value as number);
  };

  return (
    <Box className={classes.root}>
      <IconButton aria-label="previes">
        <NavigateBeforeIcon />
      </IconButton>

      <FormControl className={classes.formControl}>
        <Select
          value={fileNameIndex}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          {fileNames.map((file, i) => (
            <MenuItem key={file} value={i}>
              {file}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton aria-label="next">
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}
