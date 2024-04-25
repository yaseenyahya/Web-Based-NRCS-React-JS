import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textBold: {
    fontWeight: "bold",
  },
  textSize:{
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
  }
}));

const WelcomeHeader = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Typography align="center">
        <Typography className={classes.textSize}>Welcome to</Typography>
        <Typography className={clsx(classes.textBold,classes.textSize)}>Mediaeye Services</Typography>
        <Typography className={classes.textSize}>(A Complete Work Station)</Typography>
      </Typography>
    </div>
  );
};
export default WelcomeHeader;
