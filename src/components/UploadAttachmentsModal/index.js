import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  useMediaQuery,
  IconButton,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setUploadAttachmentsModalFilesData,
  setUploadAttachmentsModalToggle,
  addUploadAttachmentsModalFilesData,
  startUploadIfNotStartedLastFile,
} from "../../store/actions/UploadAttachmentsModalActions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AddIcon from "@material-ui/icons/Add";
import { UploadType } from "../mediaPlayerModal/UploadType";
import { uploadFileStatusType } from "./uploadFileStatusType";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { setCameraModalToggle } from "../../store/actions/CameraModalActions";
import CameraModal from "../Camera/CameraModal";
import UploadGridList from "./UploadGridList";
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
    fontWeight:600
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
  addAttachmentButton: {
    color: "white",
    borderRadius: 0,
  },
  addAttachmentButtonIcon: {
    fontSize: 25,
  },
  cameraButton: {
    color: "white",
    borderRadius: 0,
  },
  cameraButtonIcon: {
    fontSize: 25,
  },
  addCameraButtonsDivider: {
    background: "white",
    margin: "10px 4px",
  },
  
}));
const UploadAttachmentsModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const fileAddButtonRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog
      scroll={"body"}
      fullScreen={isScreenExtraSmall}
      classes={{ paper: classes.dialogPaper }}
      open={props.uploadAttachmentsModalToggle}
      onClose={() => {
        props.setUploadAttachmentsModalToggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        <Box flexGrow={1} display={"flex"}>
          <input
            onChange={(event) => {
              var files = event.target.files;
              var filesData = [];
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fileName = file.name;
                filesData.push({
                  filename: fileName,
                  fileForUpload: file,
                  status: uploadFileStatusType.pending,
                  type: UploadType.AXON,
                });
              }
              props.addUploadAttachmentsModalFilesData(
                filesData,
                enqueueSnackbar
              );
            }}
            ref={fileAddButtonRef}
            accept="image/*,video/mp4,video/x-m4v,video/*,zip,application/zip,application/x-zip,application/x-zip-compressed,audio/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            name="raised-button-file"
            multiple
            type="file"
          />
          <Button
            onClick={() => {
              fileAddButtonRef.current.click();
            }}
            className={classes.addAttachmentButton}
          >
            <AddIcon className={classes.addAttachmentButtonIcon} />
          </Button>

          <Divider
            orientation={"vertical"}
            flexItem
            className={classes.addCameraButtonsDivider}
          />
          <Button
            className={classes.cameraButton}
            onClick={() => {
              props.setCameraModalToggle(true);
            }}
          >
            <CameraAltIcon className={classes.cameraButtonIcon} />
          </Button>
          <CameraModal />
        </Box>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setUploadAttachmentsModalToggle(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          minWidth: props.userPanelWindowSize.width - 125,
          height: props.userPanelWindowSize.height - 125,
        }}
        dividers={"paper"}
        className={classes.dialogContent}
      >
        <UploadGridList/>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.UploadAttachmentsModalReducer,
    ...state.UserPanelReducer,
    ...state.CameraModalReducer,
  };
};
export default connect(mapStateToProps, {
  setUploadAttachmentsModalFilesData,
  setUploadAttachmentsModalToggle,
  addUploadAttachmentsModalFilesData,
  startUploadIfNotStartedLastFile,
  setCameraModalToggle,
})(UploadAttachmentsModal);
