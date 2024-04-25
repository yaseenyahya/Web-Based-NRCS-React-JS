import React, { useEffect } from "react";
import FileCopy from "@material-ui/icons/FileCopy";
import Check from "@material-ui/icons/Check";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  IconButton
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({

  buttonIcon: {
    color: "rgb(219 61 68)",
    strokeDasharray: 100,
    position: "absolute",
    transition: "all 300ms ease-in-out"
  },
  button: {
    padding: 4,

  },
  buttonIconCheck: {
    color: "green",
    strokeDasharray: 100,
    position: "absolute",
    transition: "all 300ms ease-in-out"
  }
}));
const CopyButton = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <span className={props.containerClassName}>
      <IconButton onClick={() => {

        props.onClick && props.onClick()
        setCopied(true)
      }
      } className={classes.button}>
        <span style={{
          position: "relative", display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 12
        }}>
          <FileCopy style={{
            strokeWidth: 1.5,
            width:20,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none",
            stroke: "currentcolor",
            strokeDashoffset: copied ? -100 : 0,

          }} className={classes.buttonIcon} />
          <Check isVisible={copied} style={{
            strokeWidth: 1.5,
            width:20,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none",
            stroke: "currentcolor",
            strokeDashoffset: copied ? 0 : -100,
          }} className={classes.buttonIconCheck} />
        </span>
      </IconButton>

    </span >
  );
});

export default CopyButton;
