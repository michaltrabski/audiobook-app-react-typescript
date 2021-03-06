import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface Props {
  snackOpen: boolean;
  setSnackOpen: (a: any) => void;
}
export default function Snack(props: Props) {
  const classes = useStyles();
  // const [snackOpen, setSnackOpen] = React.useState(false);

  const { snackOpen, setSnackOpen } = props;

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
    >
      <Alert onClose={handleCloseSnack} severity="info">
        This feature will be available soon!
      </Alert>
    </Snackbar>
  );
}
