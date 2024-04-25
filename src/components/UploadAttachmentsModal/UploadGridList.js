import React from "react";
import {
  Box,
  Button,
  useMediaQuery,
  GridList,
  GridListTile,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setUploadAttachmentsModalFilesData,
  startUploadIfNotStartedLastFile,
} from "../../store/actions/UploadAttachmentsModalActions";
import VideoThumbnail from "../react-video-thumbnail";
import includes from "../editorViewer/includes";
import { resolveSettings } from "../../auth/resolveSettings";
import { uploadFileStatusType } from "./uploadFileStatusType";
import { useSnackbar } from "notistack";
import _ from "lodash";
import UploadGridBox from "./UploadGridBox";
const useStyles = makeStyles((theme) => ({
 
  gridList: {
    margin: "0!important",
  },
  
}));
const UploadGridList = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const { enqueueSnackbar } = useSnackbar();
  return (
    <GridList
      spacing={10}
      cellHeight={160}
      className={classes.gridList}
      cols={isScreenExtraSmall ? 2 : isScreenSmall ? 3 : 5}
    >
      {new includes()
        .getUploadFilesWithSourceUrl(
          props.uploadAttachmentsModalFilesData,
          new resolveSettings().resolveAxonAppFileWatchDownloadFolderSource(),
          new resolveSettings().resolveVORecordingSavePath(),
          true
        )
        .map((files) => {
          return (
            <GridListTile>
              <UploadGridBox currentFile={files}></UploadGridBox>
            </GridListTile>
          );
        })}
    </GridList>
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
})(UploadGridList);
