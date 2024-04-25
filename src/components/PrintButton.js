import React, { useEffect } from "react";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  IconButton
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
 
  printButtonIcon: {},
  printButton:{
    padding:4
  }
}));
const PrintButton = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <span className={props.printButtonContainerClassName} style={props.style}>
      <IconButton onClick={props.onClick} className={classes.printButton}>
        <PrintIcon className={classes.printButtonIcon} />
      </IconButton>
    </span>
  );
});

export default PrintButton;
