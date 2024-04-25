import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setModDetailsModalToggle,
  setModDetailsModalTitle,
  setModDetailsModalContentText,
  setModDetailsModalReadDetails,
  setModDetailsModalReadDetailsContainerToggle,
  setModDetailsModalCorrectionDetails,
  setModDetailsModalCorrectionDetailsContainerToggle,
  setModDetailsModalArrowPreviousActive,
  setModDetailsModalArrowNextActive,
  setModDetailsModalLoading,
  setModDetailsModalReset,
} from "../../store/actions/ModDetailsModalActions";
import clsx from "clsx";
import { FolderTypes } from "../../auth/FolderTypes";
import ApiCalls from "../../api/ApiCalls";
import modDetailsBinder from "./modDetailsBinder";
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
  modDetailsModalContainerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modDetailsModalCircularProgress: {
    color: "#db3d44",
  },
  readDetailsButton: {
    padding: 0,
    minWidth: 40,
  },
  readDetailsButtonIcon: {
    width: 30,
    height: 30,
  },
  arrowPreviousButton: {
    padding: 0,
    minWidth: 40,
    background: "#E14425",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#ec2f09",
    },
  },
  arrowPreviousButtonDisabled: {
    background: "#bfbdbd",
    color: "white!important",
  },
  arrowPreviousButtonIcon: {
    width: 40,
    height: 40,
    borderRight: "1px solid #909090",
  },

  arrowNextButton: {
    padding: 0,
    minWidth: 40,
    background: "#E14425",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#ec2f09",
    },
  },
  arrowNextButtonDisabled: {
    background: "#bfbdbd",
    color: "white!important",
  },
  arrowNextButtonIcon: {
    width: 40,
    height: 40,
  },
  modDetailsTitleText: {
    display: "inline",
    textDecoration: "underline",
    marginLeft: 5,
  },
  modDetailsTopContainer: {
    borderBottom: "1px solid #909090",
    borderTop: "1px solid #909090",
  },
  modDetailsContentText: {
    fontSize: 30,
    fontFamily: "system-ui",
    lineHeight: "37px",

    "unicode-bidi": "plaintext",
    "-webkit-rtl-ordering": "logical",
    "flex-direction": "column",
    resize: "auto",
    cursor: "text",
    "white-space": "pre-wrap",
    "overflow-wrap": "break-word",
    padding: 5,
    textAlign: "right",

  },
  modDetailsCorrectionDetailsText: {
    background: "orange",
    padding: 5,
    color: "white",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  modDetailsModalReadDetailsText: {
    borderBottom: "1px solid #cccccc",
    padding: 5,
  },
}));
const ModDetailsModal = (props) => {
  const classes = useStyles();
  const bindValuesCallback = (
    title,
    contentTextHtml,
    arrowPreviousActive,
    arrowNextActive,
    correctionDetail,
    readDetails
  ) => {

    props.setModDetailsModalTitle(title);
    props.setModDetailsModalContentText(contentTextHtml);
    props.setModDetailsModalReadDetails(readDetails);
    props.setModDetailsModalCorrectionDetails(correctionDetail);
    props.setModDetailsModalArrowPreviousActive(arrowPreviousActive);
    props.setModDetailsModalArrowNextActive(arrowNextActive);
    toggleCorrectionDetailsContainer();
  };
  let timerForCorrectionDetailsToggle = null;
  const toggleCorrectionDetailsContainer = () => {
    props.setModDetailsModalCorrectionDetailsContainerToggle(true);

    if (timerForCorrectionDetailsToggle != null)
      clearInterval(timerForCorrectionDetailsToggle);

    timerForCorrectionDetailsToggle = setTimeout(function () {
      props.setModDetailsModalCorrectionDetailsContainerToggle(false);
      timerForCorrectionDetailsToggle = null;
    }, 2000);
  };
  const modDetailsBinderObj = useRef(null);

  useEffect(() => {
    props.setModDetailsModalReset();
    if (props.modDetailsModalToggle) {
      modDetailsBinderObj.current = new modDetailsBinder(bindValuesCallback);
      getModDetails(props.folderType, props.itemDataType, props.itemId);
    }
  }, [
    props.itemId,
    props.folderType,
    props.modDetailsModalToggle,
    props.itemDataType,
  ]);

  const modDetailsModalArrowPreviousActive = useRef(null);
  modDetailsModalArrowPreviousActive.current =
    props.modDetailsModalArrowPreviousActive;

  const modDetailsModalArrowNextActive = useRef(null);
  modDetailsModalArrowNextActive.current = props.modDetailsModalArrowNextActive;

  const folderType_ = useRef(null);
  folderType_.current = props.folderType;

  const itemId_ = useRef(null);
  itemId_.current = props.itemId;

  const getModDetails = (folderType, itemDataType, itemId) => {
    if (folderType == FolderTypes.Rundowns) {

      ApiCalls.getRundownModificationDetails(itemId)
        .then((responseJson) => {
          if (responseJson.Data != null) {

            if (itemId == itemId_.current && folderType == folderType_.current) {
              props.setModDetailsModalLoading(false);
              modDetailsBinderObj.current.Data = responseJson.Data;

              modDetailsBinderObj.current.getBindValues(
                modDetailsModalArrowPreviousActive.current,
                modDetailsModalArrowNextActive.current,
                null
              );
            }
          }
        })
        .catch((error) => {
          if (itemId == itemId_.current && folderType == folderType_.current) {
            getModDetails(folderType, itemDataType, itemId);
          }
        });
    } else {
      ApiCalls.getModificationWithReadDetails(itemId, itemDataType)
        .then((responseJson) => {
          if (responseJson.Data != null) {
            props.setModDetailsModalLoading(false);
            modDetailsBinderObj.current.Data =
              responseJson.Data.editedBullitens;

            modDetailsBinderObj.current.getBindValues(
              modDetailsModalArrowPreviousActive.current,
              modDetailsModalArrowNextActive.current,
              responseJson.Data.readDetails
            );
          }
        })
        .catch((error) => {
          if (itemId == itemId.current && folderType == folderType.current) {
            getModDetails(folderType, itemDataType, itemId);
          }
        });
    }
  };
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.modDetailsModalToggle}
      onClose={() => {
        props.setModDetailsModalToggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        <Typography className={classes.titleText} variant="h6">
          Modification Details
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setModDetailsModalToggle(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div
          className={clsx({
            [classes.modDetailsModalContainerFlex]:
              props.modDetailsModalLoading,
          })}
          style={{
            minWidth: props.userPanelWindowSize.width - 125,
            minHeight: props.userPanelWindowSize.height - 125,
          }}
        >
          {props.modDetailsModalLoading ? (
            <CircularProgress
              className={classes.modDetailsModalCircularProgress}
            ></CircularProgress>
          ) : (
            <>
              {props.modDetailsModalReadDetailsContainerToggle && (
                <Container disableGutters={true} maxWidth={true}>
                  {props.modDetailsModalReadDetails.map((item, index) => (
                    <Typography
                      className={classes.modDetailsModalReadDetailsText}
                      key={index}
                    >
                      {item.username + " on " + item.date + " " + item.time}
                    </Typography>
                  ))}
                </Container>
              )}
              <Container
                maxWidth={true}
                disableGutters={true}
                className={classes.modDetailsTopContainer}
              >
                <EditorMenuButton containerStyle={{ display: "inline" }} />
                <Button
                  onClick={() => {
                    props.setModDetailsModalReadDetailsContainerToggle(
                      !props.modDetailsModalReadDetailsContainerToggle
                    );
                  }}
                  className={classes.readDetailsButton}
                >
                  <VisibilityIcon className={classes.readDetailsButtonIcon} />
                </Button>

                <Button
                  onClick={() => {
                    let arrowPreviousActive =
                      props.modDetailsModalArrowPreviousActive;
                    let arrowNextActive = props.modDetailsModalArrowNextActive;
                    modDetailsBinderObj.current.currentIndex--;
                    arrowNextActive = true;
                    if (modDetailsBinderObj.current.currentIndex == 0)
                      arrowPreviousActive = false;

                    modDetailsBinderObj.current.getBindValues(
                      arrowPreviousActive,
                      arrowNextActive,
                      props.modDetailsModalReadDetails
                    );
                  }}
                  className={clsx(classes.arrowPreviousButton, {
                    [classes.arrowPreviousButtonDisabled]: !props.modDetailsModalArrowPreviousActive,
                  })}
                  disabled={!props.modDetailsModalArrowPreviousActive}
                >
                  <ArrowLeftIcon className={classes.arrowPreviousButtonIcon} />
                </Button>
                <Button
                  onClick={() => {
                    let arrowPreviousActive =
                      props.modDetailsModalArrowPreviousActive;
                    let arrowNextActive = props.modDetailsModalArrowNextActive;
                    modDetailsBinderObj.current.currentIndex++;
                    arrowPreviousActive = true;

                    if (
                      modDetailsBinderObj.current.currentIndex ==
                      modDetailsBinderObj.current.Data.length - 1
                    ) {
                      arrowNextActive = false;
                    }

                    modDetailsBinderObj.current.getBindValues(
                      arrowPreviousActive,
                      arrowNextActive,
                      props.modDetailsModalReadDetails
                    );
                  }}
                  className={clsx(classes.arrowNextButton, {
                    [classes.arrowNextButtonDisabled]: !props.modDetailsModalArrowNextActive,
                  })}
                  disabled={!props.modDetailsModalArrowNextActive}
                >
                  <ArrowRightIcon className={classes.arrowNextButtonIcon} />
                </Button>
                <Typography className={classes.modDetailsTitleText}>
                  {props.modDetailsModalTitle}
                </Typography>
              </Container>
              {props.modDetailsModalCorrectionDetailsContainerToggle && (
                <Typography className={classes.modDetailsCorrectionDetailsText}>
                  {props.modDetailsModalCorrectionDetails}
                </Typography>
              )}
              <pre
                style={{ fontSize: props.editorViewFontSize + "px", lineHeight: (props.editorViewFontSize <= 30 ? "37px" : "normal") }}
                dangerouslySetInnerHTML={{
                  __html: props.modDetailsModalContentText,
                }}
                className={classes.modDetailsContentText}
              ></pre>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.ModDetailsModalReducer, ...state.EditorViewReducer, ...state.UserPanelReducer };
};
export default connect(mapStateToProps, {
  setModDetailsModalToggle,
  setModDetailsModalTitle,
  setModDetailsModalContentText,
  setModDetailsModalReadDetails,
  setModDetailsModalReadDetailsContainerToggle,
  setModDetailsModalCorrectionDetails,
  setModDetailsModalCorrectionDetailsContainerToggle,
  setModDetailsModalArrowPreviousActive,
  setModDetailsModalArrowNextActive,
  setModDetailsModalLoading,
  setModDetailsModalReset,
})(ModDetailsModal);
