import React, { useRef, useEffect } from "react";
import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { setCameraModalToggle } from "../../store/actions/CameraModalActions";
import Camera from "./index";
const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: "0!important",
    width:"inherit",
    height:"inherit"

  },
  dialogPaper: {
    maxWidth: "100%",
  },
}));
const CameraModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      fullScreen={true}
      scroll={"body"}
      classes={{ paper: classes.dialogPaper }}
      open={props.cameraModalToggle}
      onEntered={() => {}}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dialogContent}>
        <Camera/>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.CameraModalReducer,
  };
};
export default connect(mapStateToProps, {
  setCameraModalToggle
})(CameraModal);
