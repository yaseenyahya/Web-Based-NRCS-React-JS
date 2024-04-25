import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Typography,
  IconButton,
  Input,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setSopperModalToggle,
  setSopperModalTextLoading,
  setSopperModalText,
} from "../../store/actions/SopperModalActions";
import clsx from "clsx";
import { FolderTypes } from "../../auth/FolderTypes";
import ApiCalls from "../../api/ApiCalls";
const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    padding: 8,
  },
  titleText: {
    paddingLeft: 4,
    fontWeight: 600
  },
  dialogTitle: {
    background: "#db3d44",
    color: "white",
    padding: 3,
  },
  dialogPaper: {
    maxWidth: "100%",
  },
  dialogContent: {
    padding: 0,
  },
  sopperTextInputContainer: {
    width: "100%",
    direction: "rtl",
    padding: 10,
  },
  sopperTextInput: {

    fontFamily: "system-ui",
    unicodeBidi: "plaintext"
  },
  sopperTextInputUnderline: {
    borderBottom: "0",
    "&:hover, &:hover&:after,  &:hover&:before": {
      borderBottom: "0",
    },
    "&:after": {
      borderBottom: "0",
    },
  },
  sopperTextInputFocused: {
    borderBottom: "0",
    "&:hover": {
      borderBottom: "0",
    },
  },
  sopperTextContainerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sopperTextCircularProgress: {
    color: "#db3d44",
  },
}));
const SopperModal = (props) => {
  const classes = useStyles();

  const folderType_ = useRef(null);
  folderType_.current = props.folderType;

  const itemId_ = useRef(null);
  itemId_.current = props.itemId;
  useEffect(() => {
    props.setSopperModalTextLoading(true);
    props.setSopperModalText("");
    if (props.sopperModalToggle) {
      getSopperStatus(props.folderType, props.itemDataType, props.itemId);
    }
  }, [
    props.itemId,
    props.folderType,
    props.sopperModalToggle,
    props.itemDataType,
  ]);

  const getSopperStatus = (folderType, itemDataType, itemId) => {
    if (folderType == FolderTypes.Rundowns) {
      ApiCalls.getRundownSopper(itemId)
        .then((responseJson) => {
          if (responseJson.Data != null) {
            if (itemId == itemId_.current && folderType == folderType_.current) {
              props.setSopperModalTextLoading(false);
              props.setSopperModalText(responseJson.Data);
            }
          }
        })
        .catch((error) => {
          if (itemId == itemId_.current && folderType == folderType_.current) {
            getSopperStatus(folderType, itemDataType, itemId);
          }
        });
    } else {
      ApiCalls.getReportSopper(itemId, itemDataType)
        .then((responseJson) => {
          if (responseJson.Data != null) {
            props.setSopperModalTextLoading(false);
            props.setSopperModalText(responseJson.Data);
          }
        })
        .catch((error) => {
          if (itemId == itemId_.current && folderType == folderType_.current) {
            getSopperStatus(folderType, itemDataType, itemId);
          }
        });
    }
  };
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.sopperModalToggle}
      onClose={() => {
        props.setSopperModalToggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        {" "}
        <Typography className={classes.titleText} variant="h6">
          Sopper
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setSopperModalToggle(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div
          className={clsx({
            [classes.sopperTextContainerFlex]: props.sopperModalTextLoading,
          })}
          style={{
            minWidth: props.userPanelWindowSize.width - 120,
            minHeight: props.userPanelWindowSize.height - 120,
          }}
        >
          {props.sopperModalTextLoading ? (
            <CircularProgress
              className={classes.sopperTextCircularProgress}
            ></CircularProgress>
          ) : (
            <Input
              style={{ fontSize: props.editorViewFontSize + "px", lineHeight: (props.editorViewFontSize <= 30 ? "37px" : "normal") }}
              className={classes.sopperTextInputContainer}
              classes={{
                input: classes.sopperTextInput,
                underline: classes.sopperTextInputUnderline,
                focused: classes.sopperTextInputFocused,
              }}
              readOnly={true}
              multiline={true}
              value={props.sopperModalText}
            ></Input>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.SopperModalReducer, ...state.UserPanelReducer, ...state.EditorViewReducer };
};
export default connect(mapStateToProps, {
  setSopperModalToggle,
  setSopperModalTextLoading,
  setSopperModalText,
})(SopperModal);
