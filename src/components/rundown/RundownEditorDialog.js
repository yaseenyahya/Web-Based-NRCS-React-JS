import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Typography,
  Button,
  Input,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import MediaPlayerPanel from "../mediaPlayerModal";
import SopperModal from "../sopperModal";
import ModDetailsModal from "../modDetailsModal";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { setRundownSelectedItemData } from "../../store/actions/RundownActions";
import clsx from "clsx";
import includes from "../editorViewer/includes";
import { resolveSettings } from "../../auth/resolveSettings";
import { FolderTypes } from "../../auth/FolderTypes";
import { setSopperModalToggle } from "../../store/actions/SopperModalActions";
import { setMediaPlayerModalToggle } from "../../store/actions/MediaPlayerModalActions";
import { setModDetailsModalToggle } from "../../store/actions/ModDetailsModalActions";
import ApiCalls from "../../api/ApiCalls";
import {
  setEditorViewReportSopperLoading,
  setEditorViewReportSopperStatus,
  setEditorViewMainTopPanelHeight,
} from "../../store/actions/EditorViewActions";
import EditorMenuButton from "../EditorMenuButton";
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
    "&:first-child": {
      padding: 0,
    },
  },
  attachmentsToggleButton: {
    background: "#EDA525",
    borderRadius: 0,
    padding: 0,
    fontSize: 19,
    color: "white",
    "&:hover": {
      backgroundColor: "#ec9600",
    },
    minWidth: 45,
  },
  attachmentsToggleIcon: {
    width: 19,
    height: 19,
  },
  topContainer: {
    display: "flex",
    height: 35,
  },
  subjectText: {
    flex: 1,
    padding: "0 5px",
    color: "white",
    background: "gray",
    lineHeight: "35px",
    fontSize: 20,
    fontFamily: "system-ui",
  },
  closeButton: {
    borderRadius: 0,
    color: "white",
    padding: 0,
    minWidth: 34,
    background: "#499cea",
    "&:hover": {
      backgroundColor: "#207ce5",
    },
  },
  middleContainer: { display: "flex", height: 27 },
  modDetailsTextToggle: {
    background: "#f44336",
    cursor: "pointer",
    color: "white",
    lineHeight: "35px",
    fontSize: 14,
    padding: "0 5px",
    flex: 1,
    lineHeight: "27px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  sopperToggleButton: {
    borderRadius: 0,
    padding: 0,
    minWidth: 34,
    fontSize: 15,
  },
  sopperToggleButtonHaveSopper: {
    color: "white",
    background: "#EDA525",
    "&:hover": {
      background: "#d28600",
    },
  },
  sopperToggleButtonNotHaveSopper: {
    background: "#B9D1EA",
    "&:hover": {
      background: "#84b6ea",
    },
  },
  sopperProgress: {
    width: "15px!important",
    height: "15px!important",
    color: "#499cea",
  },
  slugTextContentContainer: {
    fontSize: 30,
    fontFamily: "system-ui",
    lineHeight: "37px",
    display: "block",
    textAlign: "right",
    "unicode-bidi": "plaintext",
    "-webkit-rtl-ordering": "logical",
    "flex-direction": "column",
    resize: "auto",
    cursor: "text",
    "white-space": "pre-wrap",
    "overflow-wrap": "break-word",
    padding: 5,

    margin: 0,
  },

  slugMainContainer: {
    overflow: "auto",
  },
}));
const RundownEditorDialog = (props) => {
  const classes = useStyles();
  var mainTopContainerRef = React.useRef();
  var rundownSelectedItemData = React.useRef(null);
  rundownSelectedItemData.current = props.rundownSelectedItemData;
  useEffect(() => {
    if (mainTopContainerRef.current != null)
      props.setEditorViewMainTopPanelHeight(
        mainTopContainerRef.current.clientHeight
      );
  }, [props.userPanelWindowSize.height, props.rundownSelectedItemData]);

  useEffect(() => {
    if (props.rundownSelectedItemData != null) {
      props.setEditorViewReportSopperLoading(true);

      getSopper(props.rundownSelectedItemData.rid);
    }
  }, [props.rundownSelectedItemData]);
  const getSopper = (itemId) => {
    ApiCalls.haveRundownSopper(itemId)
      .then((responseJson) => {
        if (responseJson.Data != null) {
          if (itemId == rundownSelectedItemData.current.rid) {
            props.setEditorViewReportSopperStatus(responseJson.Data);
           
            props.setEditorViewReportSopperLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (itemId == rundownSelectedItemData.current.rid) {
          getSopper(itemId);
        }
      });
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.rundownSelectedItemData != null}
      onClose={() => {
        props.setRundownSelectedItemData(null);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
        className={classes.dialogContent}
        style={{
          minWidth: props.userPanelWindowSize.width - 120,
          minHeight: props.userPanelWindowSize.height - 120,
        }}
      >
        {props.rundownSelectedItemData && (
          <Container disableGutters={true} maxWidth={true}>
            <Container
              ref={mainTopContainerRef}
              disableGutters={true}
              maxWidth={true}
              className={classes.mainTopContainer}
            >
              <Container disableGutters={true} maxWidth={true} className={classes.topContainer}>
              <EditorMenuButton  />
                <Button
                  onClick={() => {
                    if (
                      new includes().getUploadFiles(
                        props.rundownSelectedItemData.rUploadFileSerilize
                      ).length > 0
                    )
                      props.setMediaPlayerModalToggle(true);
                  }}
                  className={classes.attachmentsToggleButton}
                >
                  <AttachFileIcon className={classes.attachmentsToggleIcon} />
                  {
                    new includes().getUploadFiles(
                      props.rundownSelectedItemData.rUploadFileSerilize
                    ).length
                  }
                </Button>
                <MediaPlayerPanel
                  mediaFiles={new includes().getUploadFilesWithSourceUrl(
                    props.rundownSelectedItemData.rUploadFileSerilize,
                    new resolveSettings().resolveAxonAppFileWatchDownloadFolderSource(),
                    new resolveSettings().resolveVORecordingSavePath(),
                    false
                  )}
                />
                <Typography className={classes.subjectText}>
                  {props.rundownSelectedItemData.rStorySlug}
                </Typography>
                <Button
                  onClick={() => {
                    props.setRundownSelectedItemData(null);
                  }}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </Button>
              </Container>
              <Container
                disableGutters={true}
                maxWidth={true}
                className={classes.middleContainer}
              >
                <Typography
                  onClick={() => {
                    props.setModDetailsModalToggle(true);
                  }}
                  className={classes.modDetailsTextToggle}
                >
                  {"Last modified by " +
                    props.rundownSelectedItemData.rLastModBy}
                </Typography>
                <ModDetailsModal
                  itemId={props.rundownSelectedItemData.rid}
                  itemDataType={null}
                  folderType={FolderTypes.Rundowns}
                ></ModDetailsModal>
                <Button
                  onClick={() => {
                    props.setSopperModalToggle(true);
                  }}
                  className={clsx(classes.sopperToggleButton, {
                    [classes.sopperToggleButtonHaveSopper]:
                      props.editorViewReportSopperStatus,
                    [classes.sopperToggleButtonNotHaveSopper]: !props.editorViewReportSopperStatus,
                  })}
                >
                  {props.editorViewReportSopperLoading ? (
                    <CircularProgress
                      className={classes.sopperProgress}
                    ></CircularProgress>
                  ) : (
                    "S"
                  )}
                </Button>
                <SopperModal
                  itemId={props.rundownSelectedItemData.rid}
                  itemDataType={null}
                  folderType={FolderTypes.Rundowns}
                />
              </Container>
            </Container>
            <Container
              style={{
                height:
                  props.userPanelWindowSize.height -
                  140 -
                  props.editorViewMainTopPanelHeight,
              }}
              disableGutters={true}
              maxWidth={true}
              className={classes.slugMainContainer}
            >
              <span
                style={{ fontSize: props.editorViewFontSize + "px", lineHeight: (props.editorViewFontSize <= 30 ? "37px" : "normal") }}
                dangerouslySetInnerHTML={{
                  __html: new includes().getSearchContentText(
                    props.searchText == "" ? props.allFolderSearchText : props.searchText,
                    props.rundownSelectedItemData.rDetailStory
                  ),
                }}
                className={classes.slugTextContentContainer}
              ></span>
            </Container>
          </Container>
        )}
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.RundownReducer,
    ...state.CRUDReducer,
    ...state.EditorViewReducer,
    ...state.TreeViewReducer,
  };
};
export default connect(mapStateToProps, {
  setRundownSelectedItemData,
  setSopperModalToggle,
  setMediaPlayerModalToggle,
  setModDetailsModalToggle,
  setEditorViewReportSopperLoading,
  setEditorViewReportSopperStatus,
  setEditorViewMainTopPanelHeight,
})(RundownEditorDialog);
