import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Container,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setMediaPlayerModalFiles,
  setMediaPlayerModalToggle,
  setMediaPlayerModalSelectedFile,
  setMediaImageContainerWidth,
  setMediaDownloadInfo,
  startMediaDownload,
} from "../../store/actions/MediaPlayerModalActions";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "../../store/actions/DialogActions";
import SimpleListView from "./SimpleListView";
import { Player, ControlBar } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ShareButton from "./ShareButton";
import includes from "../editorViewer/includes";
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
  fileListGrid: {
    borderRight: "1px solid #bdbbbb",
    overflow: "auto",
  },
  mediaPlayer: {
    height: "100%!important",
  },
  mediaPlayerGrid: {
    background: "gray",
  },
  circularProgressText: {
    color: "black",
    fontSize: 9,
  },
  downloadShareButtonContainer: {
    position: "absolute",
    padding: 0,
    width: 80,
    zIndex: 1,
    right: 0,
  },
  downloadButton: {
    background: "#f0f8ff78",
    borderRadius: 0,
    borderRight: "1px solid black",
    padding: "0 8px",
    height: 36,
    "&:hover": {
      background: "#ffffff"
    },
  },
  downloadCircularProgress: {
    width: "30px!important",
    height: "30px!important",
    color: "#db3d44",
  },
  shareButton: {
    background: "#f0f8ff78",
    borderRadius: 0,
    "&:hover": {
      background: "#ffffff"
    },
  },
  mediaImage: {
    width: "100%",
  },
}));
const MediaPlayerModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const mediaPlayerRef = useRef(null);
  const mediaImageContainerRef = useRef(null);
  useEffect(() => {
    if (mediaImageContainerRef.current)
      props.setMediaImageContainerWidth(
        mediaImageContainerRef.current.clientWidth
      );
  }, [
    mediaImageContainerRef.current &&
      mediaImageContainerRef.current.clientWidth,
  ]);
  
  useEffect(() => {
    props.setMediaPlayerModalSelectedFile(null);
  }, [props.mediaPlayerModalToggle]);
  let contentPanelHeight = props.userPanelWindowSize.height - 120;

  const closeModal = () => {
    if (props.mediaDownloadInfo != null) {
      props.setDialogOkText("OK");
      props.setDialogTitle("Confirm");
      props.setDialogContent(
        "Downloading is in progress! are you sure want to close?"
      );
      props.setDialogCancelText("Cancel");
      props.setDialogOkClick(() => {
        var mediaInfo = props.mediaDownloadInfo;
        if (mediaInfo != null) {
          mediaInfo.cancelToken.cancel();
          props.setMediaDownloadInfo(null);
        }
        props.setDialogOpen(false);
        props.setMediaPlayerModalToggle(false);
      });
      props.setDialogOpen(true);
    } else props.setMediaPlayerModalToggle(false);
  };
 
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.mediaPlayerModalToggle}
      onClose={() => {
        closeModal();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        <Typography className={classes.titleText} variant="h6">
          Media Player
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            closeModal();
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}  style={{
            minWidth: props.userPanelWindowSize.width - 125,
            minHeight: props.userPanelWindowSize.height - 125,
          }}>
        <Container disableGutters={true} maxWidth={true}>
          <Grid container>
            <Grid
              style={{
                height:
                  isScreenSmall || isScreenExtraSmall
                    ? contentPanelHeight / 2
                    : contentPanelHeight,
              }}
              className={classes.fileListGrid}
              item
              xs={12}
              sm={12}
              lg={6}
              md={6}
              xl={6}
            >
              <SimpleListView
                onItemClick={(item) => {
                  props.setMediaPlayerModalSelectedFile(item);
                  if (mediaPlayerRef.current) {
                    mediaPlayerRef.current.load();
                    mediaPlayerRef.current.play();
                  }
                }}
                items={props.mediaFiles}
              ></SimpleListView>
            </Grid>
            <Grid
             style={{
              height:
                isScreenSmall || isScreenExtraSmall
                  ? contentPanelHeight / 2
                  : contentPanelHeight,
            }}
              ref={mediaImageContainerRef}
              className={classes.mediaPlayerGrid}
              item
              xs={12}
              sm={12}
              lg={6}
              md={6}
              xl={6}
            >
              {props.mediaPlayerModalSelectedFile && (
                <>
                  <Container
                    disableGutters={false}
                    className={classes.downloadShareButtonContainer}
                  >
                    <Button
                      disabled={props.mediaDownloadInfo}
                      className={classes.downloadButton}
                      onClick={async () => {
                        props.startMediaDownload(
                          props.mediaPlayerModalSelectedFile.text,
                          props.mediaPlayerModalSelectedFile.id
                        );
                      }}
                    >
                      {props.mediaDownloadInfo ? (
                        <Box position="relative" display="inline-flex">
                          <CircularProgress
                            variant={
                              props.mediaDownloadInfo.progress == 0
                                ? "indeterminate"
                                : "static"
                            }
                            value={props.mediaDownloadInfo.progress}
                            className={classes.downloadCircularProgress}
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
                              props.mediaDownloadInfo.progress
                            )}%`}</Typography>
                          </Box>
                        </Box>
                      ) : (
                        <CloudDownloadIcon />
                      )}
                    </Button>

                {/* <ShareButton shareUrl={ props.mediaPlayerModalSelectedFile.id} title={"Axon File Share"} className={classes.shareButton}></ShareButton> */}
                  </Container>
                  {new includes().hasImageExtension(props.mediaPlayerModalSelectedFile.id) ? (
                    <img
                      className={classes.mediaImage}
                      style={{
                        height:
                          ((isScreenSmall || isScreenExtraSmall) && props.mediaPlayerModalSelectedFile.id)
                            ? contentPanelHeight / 2
                            : contentPanelHeight,
                      }}
                      src={props.mediaPlayerModalSelectedFile.id}
                    />
                  ) : (
                    <Player
                      ref={mediaPlayerRef}
                      autoplay={true}
                      className={classes.mediaPlayer}
                      src={props.mediaPlayerModalSelectedFile.id}
                    >
                      <ControlBar autoHide={false} />
                    </Player>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.MediaPlayerModalReducer, ...state.UserPanelReducer };
};
export default connect(mapStateToProps, {
  setMediaPlayerModalFiles,
  setMediaPlayerModalToggle,
  setMediaPlayerModalSelectedFile,
  setMediaImageContainerWidth,
  setMediaDownloadInfo,
  startMediaDownload,
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
})(MediaPlayerModal);
