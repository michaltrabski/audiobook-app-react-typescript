import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import Switch from "./Switch";
import { Context } from "../App";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import { APPTITLE } from "../settings/settings";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    toolbar: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function HideAppBar(props: Props) {
  const classes = useStyles();
  const { darkMode } = useContext(Context);

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          className={classes.root}
          color={darkMode ? "inherit" : "primary"}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuBookTwoToneIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {APPTITLE}
            </Typography>
            <Switch />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

const Header = () => {
  return (
    <HideAppBar>
      <></>
    </HideAppBar>
  );
};

export default Header;
