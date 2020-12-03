import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">mp3 files:</InputLabel>
      <Select
        native
        value={fileNameIndex}
        onChange={handleChange}
        label="mp3 file"
        inputProps={{
          name: "file",
          id: "outlined-age-native-simple",
        }}
      >
        {/* <option aria-label="None" value="" /> */}
        {fileNames.map((file, i) => (
          <option key={file} value={i}>
            {file}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
