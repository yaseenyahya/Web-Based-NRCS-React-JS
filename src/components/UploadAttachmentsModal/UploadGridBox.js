import React from "react";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setUploadAttachmentsModalFilesData,
  startUploadIfNotStartedLastFile,
} from "../../store/actions/UploadAttachmentsModalActions";
import VideoThumbnail from "../react-video-thumbnail";
import includes from "../editorViewer/includes";
import { uploadFileStatusType } from "./uploadFileStatusType";
import { useSnackbar } from "notistack";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  thumbnailContainer: {
    width: "100%",
    height: "100%",
    background: "gray",
  },

  gridListImageView: {
    width: "100%",
    height: "100%",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  deleteFileButton: {
    margin: "auto",
    color: "white",
    background: "#e14425a1",
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#f15031",
    },

    height: 28,
  },
  cancelUploadFileButton: {
    margin: "auto",
    color: "white",
    background: "#e14425a1",
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#f15031",
    },

    height: 28,
  },
  filesToolBox: {
    width: "inherit",
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
  },

  circularProgressText: {
    color: "black",
    fontSize: 9,
  },
  uploadCircularProgress: {
    width: "30px!important",
    height: "30px!important",
    color: "#db3d44",
    marginBottom: 5,
  },
}));
const UploadGridBox = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box className={classes.thumbnailContainer} display={"flex"}>
      {new includes().hasImageExtension(props.currentFile.fileWithSource) ? (
        <div
          key={props.currentFile.filename}
          className={classes.gridListImageView}
          style={{
            backgroundImage: "url('" + props.currentFile.fileWithSource + "')",
          }}
        ></div>
      ) : (
        <VideoThumbnail
          key={props.currentFile.filename}
          thumbnailHandler={(thumbnail) => console.log("yaseen", thumbnail)}
          videoUrl={props.currentFile.fileWithSource}
        />
      )}
      {props.currentFile.status == uploadFileStatusType.pending && (
        <Box className={classes.filesToolBox}>
          <Box  position="relative"
            display="flex"
            justifyContent="center"
            flex="1"
            alignItems={"center"}>
            <CircularProgress
              variant={"indeterminate"}
              className={classes.uploadCircularProgress}
            ></CircularProgress>
          </Box>
          <Box flex="1" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            className={classes.cancelUploadFileButton}
            onClick={() => {
              _.remove(
                props.uploadAttachmentsModalFilesData,
                (fileItem) => fileItem.filename == props.currentFile.filename
              );
              props.setUploadAttachmentsModalFilesData(
                props.uploadAttachmentsModalFilesData
              );
              props.startUploadIfNotStartedLastFile(enqueueSnackbar);
            }}
          >
            Cancel
          </Button>
          </Box>
        </Box>
      )}
      {props.currentFile.status == uploadFileStatusType.uploading && (
        <Box className={classes.filesToolBox}>
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            flex="1"
            alignItems={"center"}
          >
            <CircularProgress
              variant={"indeterminate"}
              value={props.currentFile.uploadStatusPercentage}
              className={classes.uploadCircularProgress}
            ></CircularProgress>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                className={classes.circularProgressText}
              >{`${Math.round(
                props.currentFile.uploadStatusPercentage != undefined
                  ? props.currentFile.uploadStatusPercentage
                  : 0
              )}%`}</Typography>
            </Box>
          </Box>
          <Box flex="1" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              className={classes.cancelUploadFileButton}
              onClick={() => {
                _.remove(
                  props.uploadAttachmentsModalFilesData,
                  (fileItem) => fileItem.filename == props.currentFile.filename
                );
                props.setUploadAttachmentsModalFilesData(
                  props.uploadAttachmentsModalFilesData
                );
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      {props.currentFile.status == uploadFileStatusType.uploaded && (
        <Box className={classes.filesToolBox}>
          <Button
            variant="contained"
            className={classes.deleteFileButton}
            onClick={() => {
              _.remove(
                props.uploadAttachmentsModalFilesData,
                (fileItem) => fileItem.filename == props.currentFile.filename
              );
              props.setUploadAttachmentsModalFilesData(
                props.uploadAttachmentsModalFilesData
              );
            }}
          >
            Delete
          </Button>
        </Box>
      )}
       {props.currentFile.status == uploadFileStatusType.failed && (
        <Box className={classes.filesToolBox}>
          <Typography color="white">Retrying...</Typography>
        </Box>
      )}
    </Box>
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
  startUploadIfNotStartedLastFile,
})(UploadGridBox);
