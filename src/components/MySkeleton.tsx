import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // width: 300,
  },
});

const MySkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Skeleton />
      <Skeleton />
      <Skeleton /> */}
      {/* <Skeleton animation={false} />
      <Skeleton animation={false} />
      <Skeleton animation={false} /> */}

      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </div>
  );
};
export default MySkeleton;
