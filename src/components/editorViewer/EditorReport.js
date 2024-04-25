import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { setTreeViewSelectedItemInfo } from "../../store/actions/TreeViewActions";
import {
  setEditorViewReportSopperLoading,
  setEditorViewReportSopperStatus,
  setEditorViewMainTopPanelHeight,
  setEditorViewScrollAvailable
} from "../../store/actions/EditorViewActions";
import { setSopperModalToggle } from "../../store/actions/SopperModalActions";
import {
  setMediaPlayerModalToggle,
  setMediaPlayerModalFiles,
} from "../../store/actions/MediaPlayerModalActions";
import { setSaveAsModalToggle } from "../../store/actions/SaveAsModalActions";
import { deleteItem } from "../../store/actions/DeleteItemActions";
import { setModDetailsModalToggle } from "../../store/actions/ModDetailsModalActions";
import clsx from "clsx";
import includes from "./includes";
import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import MediaPlayerPanel from "../mediaPlayerModal";
import SopperModal from "../sopperModal";
import ModDetailsModal from "../modDetailsModal";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAsModal from "../saveAsModal";
import { useSnackbar } from "notistack";
import EditItemModal from "../AddEditItemModal/EditItemModal";
import {
  setEditItemModalToggle,
  setEditItemModalSubject,
  setEditItemModalContent,
  setEditItemModalFolderData,
} from "../../store/actions/EditItemModalActions";
import { setUploadAttachmentsModalFilesData } from "../../store/actions/UploadAttachmentsModalActions";
import each from "lodash/each";
import PrintButton from "../PrintButton";
import CopyButton from "../CopyButton";
import { useReactToPrint } from "react-to-print";
import EditorMenuButton from "../EditorMenuButton";
import moment from "moment";
import { auth } from "../../auth/auth";
const useStyles = makeStyles((theme) => ({
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
    wordBreak: "break-all",
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
    //lineHeight: "37px",
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
    outline: 0,
  },

  slugMainContainer: {
    overflow: "auto",
  },
  bottomContainer: {
    display: "flex",
  },
  selectionToggleContainerButton: {
    maxWidth: 40,
  },
  selectionBackButton: {
    padding: 0,
    minWidth: "auto",
    width: "100%",
    height: "50%",
    background: "#499cea",
    borderRadius: 0,
    borderBottom: "1px solid #5a5a5a",
    "&:hover": {
      backgroundColor: "#207ce5",
    },
  },
  selectionNextButton: {
    padding: 0,
    minWidth: "auto",
    width: "100%",
    height: "50%",
    background: "#499cea",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#207ce5",
    },
  },
  selectionBackIconButton: {
    color: "white",
    width: 70,
    height: 50,
  },
  selectionNextIconButton: {
    color: "white",
    width: 70,
    height: 50,
  },
  editReportButton: {
    background: "#607d8b",
    borderRadius: 0,
    padding: 0,
    fontSize: 19,
    color: "white",
    "&:hover": {
      backgroundColor: "#589bbb",
    },
    minWidth: 45,
  },
  editReportButtonIcon: {},
  saveAsButton: {
    borderRadius: 0,
    background: "#499cea",
    "&:hover": {
      backgroundColor: "#207ce5",
    },
    height: 36,
    padding: "6px 8px",
    color: "white",
    whiteSpace: "nowrap",
  },
  buttonDisabled: {
    pointerEvents: "auto!important",
    cursor: "not-allowed!important",
  },
  deleteItemIconButton: {
    padding: "0 20px",
    color: "rgb(219 61 68)",
  },
  durationTextContainer: {
    position: "absolute",
    background: "#000000a6",
    color: "white",
    fontSize: 11,
    padding: "0 3px",
  },
  printButtonContainer: {
    position: "absolute",
    zIndex: 0,
    bottom: 0,
    right: 0,
    background: "#80808096",
  },
  copyButtonContainer: {
    position: "absolute",
    zIndex: 0,
    bottom: 0,
    left: 0,
    background: "#80808096",
  },
  printContainer: {
    margin: 10,
    padding: 10,
  },
  hiddenContainer: {
    display: "none",
  },
  printSubjectContainer: {
    fontSize: 25,
    textDecoration: "underline"
  },
  printContentContainer: {
    fontSize: 30,
    "unicode-bidi": "plaintext",
    "-webkit-rtl-ordering": "logical",
  },
}));

const EditorReport = React.forwardRef((props, ref) => {

  const { enqueueSnackbar } = useSnackbar();
  var mainTopContainerRef = React.useRef();

  var editorRef = React.useRef();
  const theme = useTheme();
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));

  const printContainer = useRef(null);
  let treeViewItemInfo = useRef(null);
  treeViewItemInfo.current = props.treeViewItemInfo;

  const checkScrollBar = (element, dir) => {
    dir = (dir === 'vertical') ?
      'scrollTop' : 'scrollLeft';

    var res = !!element[dir];

    if (!res) {
      element[dir] = 1;
      res = !!element[dir];
      element[dir] = 0;
    }
    return res;
  }


  useEffect(() => {
    props.setEditorViewMainTopPanelHeight(
      mainTopContainerRef.current.clientHeight
    );
  }, [props.userPanelWindowSize.height]);
  if (editorRef.current) {
    props.setEditorViewScrollAvailable(checkScrollBar(editorRef.current, "vertical"))
  }
  React.useEffect(() => {
    function handleResize() {

      if (editorRef.current) {
        props.setEditorViewScrollAvailable(checkScrollBar(editorRef.current, "vertical"))
      }

    }

    window.addEventListener('resize', handleResize)
  });
  useEffect(() => {
    props.setEditorViewReportSopperLoading(true);

    getSopper(props.treeViewItemInfo.info.id, props.treeViewItemInfo.info.type);
  }, [props.treeViewItemInfo]);
  const getSopper = (itemId, itemDataType) => {
    ApiCalls.haveSopper(itemId, itemDataType)
      .then((responseJson) => {
        if (responseJson.Data != null) {
          if (itemId == treeViewItemInfo.current.info.id) {
            props.setEditorViewReportSopperStatus(responseJson.Data);
           
            props.setEditorViewReportSopperLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (itemId == treeViewItemInfo.current.info.id) {
          getSopper(itemId, itemDataType);
        }
      });
  };
  const classes = useStyles();
  const allowDeleteItem = new resolveSettings().resolveAllowDeletePermissionByFolderId(
    props.treeViewItemInfo.info.mainfolderid,
    props.treeViewItemInfo.info.innerfolderid
  );
  const handlePrint = useReactToPrint({
    content: () => printContainer.current,
  });

  return (
    <Container disableGutters={true} maxWidth={true}>
      <div className={classes.hiddenContainer}>
        <div ref={printContainer} className={classes.printContainer}>
          <h1 className={classes.printSubjectContainer}>
            {props.treeViewItemInfo.info.subject}
          </h1>
          <h4 className={classes.printContentContainer}>
            {props.treeViewItemInfo.info.slugtext}
          </h4>
        </div>
      </div>
      <Container
      maxWidth={true}
        ref={mainTopContainerRef}
        disableGutters={true}
        className={classes.mainTopContainer}
      >
        <Container maxWidth={true} disableGutters={true} className={classes.topContainer}>
        <EditorMenuButton/>
          <Button
            onClick={() => {
              if (
                new includes().getUploadFiles(
                  props.treeViewItemInfo.info.uploadfileserilize
                ).length > 0
              )
                props.setMediaPlayerModalToggle(true);
            }}
            className={classes.attachmentsToggleButton}
          >
            <AttachFileIcon className={classes.attachmentsToggleIcon} />
            {
              new includes().getUploadFiles(
                props.treeViewItemInfo.info.uploadfileserilize
              ).length
            }
          </Button>
          <MediaPlayerPanel
            mediaFiles={new includes().getUploadFilesWithSourceUrl(
              props.treeViewItemInfo.info.uploadfileserilize,
              new resolveSettings().resolveAxonAppFileWatchDownloadFolderSource(),
              new resolveSettings().resolveVORecordingSavePath(),
              false
            )}
          />
          <IconButton
            onClick={() => {
              props.deleteItem(enqueueSnackbar);
            }}
            aria-label="delete"
            className={clsx(
              { [classes.buttonDisabled]: !allowDeleteItem || !new resolveSettings().resolveUserDeletePermission()},
              classes.deleteItemIconButton
            )}
            disabled={!allowDeleteItem || !new resolveSettings().resolveUserDeletePermission()}
          >
            {props.deleteItemButtonLoading ? (
              <CircularProgress size={20} />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
          {props.treeViewItemInfo != null && (
            <>
              <Button
                onClick={() => {
                  props.setSaveAsModalToggle(true);
                }}
                className={classes.saveAsButton}
              >
                Save As
              </Button>
              <SaveAsModal />
            </>
          )}
          <Typography className={classes.subjectText}>
            {props.treeViewItemInfo.info.subject}
          </Typography>
          <Button
            onClick={() => {
              props.setTreeViewSelectedItemInfo(null);
            }}
            className={classes.closeButton}
          >
            <CloseIcon />
          </Button>
        </Container>
        <Container maxWidth={true} disableGutters={true} className={classes.middleContainer}>
      
          {new resolveSettings().resolveAllowEditPermissionByFolderId(
            props.treeViewItemInfo.info.mainfolderid,
            props.treeViewItemInfo.info.innerfolderid
          ) && new resolveSettings().resolveUserEditPermission() && (
              <>
                <Button
                  onClick={() => {
                    props.setEditItemModalToggle(true);
                    props.setEditItemModalSubject(
                      props.treeViewItemInfo.info.subject
                    );
                    props.setEditItemModalContent(
                      props.treeViewItemInfo.info.slugtext
                    );
                    props.setUploadAttachmentsModalFilesData(
                      new includes().getUploadFiles(
                        props.treeViewItemInfo.info.uploadfileserilize
                      )
                    );
                  }}
                  className={classes.editReportButton}
                >
                  <EditIcon className={classes.editReportButtonIcon} />
                </Button>
                <EditItemModal />
              </>
            )}
          <Typography
            onClick={() => {
          
              props.setModDetailsModalToggle(true);
            }}
            className={classes.modDetailsTextToggle}
          >
   
   
   { props.treeViewItemInfo.info.lastmodby ? props.treeViewItemInfo.info.lastmodby.Type +
              ": " +
              props.treeViewItemInfo.info.lastmodby.UserName +
              " " +
              props.treeViewItemInfo.info.lastmodby.CreationDate +
              "  " +
              props.treeViewItemInfo.info.lastmodby.CreationTime :
              "Created: " + moment(props.treeViewItemInfo.info.date, 'MM-DD-YYYY hh:mm:ss A').format('MM/DD/YYYY')
            + " " + props.treeViewItemInfo.info.time + "  From "+ new resolveSettings().resolveFolderNameById(
              props.treeViewItemInfo.info.mainfolderid
            )
              }
          </Typography>
          <ModDetailsModal
            itemId={props.treeViewItemInfo.info.id}
            itemDataType={props.treeViewItemInfo.info.type}
            folderType={
              new resolveSettings().resolveFolderSettings(
                props.treeViewItemInfo.info.mainfolderid
              ).FolderType
            }
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
            itemId={props.treeViewItemInfo.info.id}
            itemDataType={props.treeViewItemInfo.info.type}
            folderType={
              new resolveSettings().resolveFolderSettings(
                props.treeViewItemInfo.folderId
              ).FolderType
            }
          />
        </Container>
      </Container>
      <Container maxWidth={true} disableGutters={true} className={classes.bottomContainer}>
        {props.showSelectionToggleButton && (
          <Container
            disableGutters={true}
            className={classes.selectionToggleContainerButton}
          >
            <Button
              onClick={props.onSelectionNext}
              className={classes.selectionBackButton}
            >
              <ArrowUpwardIcon className={classes.selectionBackIconButton} />{" "}
            </Button>
            <Button
              onClick={props.onSelectionBack}
              className={classes.selectionNextButton}
            >
              <ArrowDownwardIcon className={classes.selectionNextIconButton} />{" "}
            </Button>
          </Container>
        )}
        <Container
          disableGutters={true}
          maxWidth={true}
          ref={editorRef}
          style={{
            height:
              props.userPanelWindowSize.height -
              (isScreenExtraSmall || isScreenSmall
                ? 0
                : props.userPanelNavbarHeight) -
              props.crudPanelheight -
              props.editorViewMainTopPanelHeight -
              2,
          }}
          
          className={classes.slugMainContainer}
        >
          <Typography className={classes.durationTextContainer}>
            Duration:{" "}
            {new includes().calculateTL(props.treeViewItemInfo.info.slugtext)}
          </Typography>
          <span

            
            contenteditable="true"
            onCut={(e) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onKeyDown={(e) => {

              if (e.ctrlKey && e.keyCode == 65) {
                return true;
              } else if (e.ctrlKey && e.keyCode == 67) {
                return true;
              } else {
                e.preventDefault();
                return false;
              }
            }}
            dangerouslySetInnerHTML={{
              __html: new includes().getSearchContentText(
                props.searchText == ""
                  ? props.allFolderSearchText
                  : props.searchText,
                props.treeViewItemInfo.info.slugtext
              ),
            }}
            className={classes.slugTextContentContainer}
            style={{fontSize:props.editorViewFontSize + "px",lineHeight:(props.editorViewFontSize <= 30 ? "37px" : "normal") }}
          ></span>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText( props.treeViewItemInfo.info.slugtext)
           
            }}
            containerClassName={classes.copyButtonContainer}
          />
          <PrintButton
            onClick={() => {
              // alert("asd")
              handlePrint();
            }}
            printButtonContainerClassName={classes.printButtonContainer} style={{marginRight:props.editorViewScrollAvailable ? 16 : 0}}
          />
        </Container>
      </Container>
    </Container>
  );
});
const mapStateToProps = (state) => {
  return {
    ...state.TreeViewReducer,
    ...state.EditorViewReducer,
    ...state.UserPanelReducer,
    ...state.CRUDReducer,
    ...state.DeleteItemReducer,
  };
};
export default connect(mapStateToProps, {
  setTreeViewSelectedItemInfo,
  setEditorViewReportSopperLoading,
  setEditorViewReportSopperStatus,
  setEditorViewMainTopPanelHeight,
  setEditorViewScrollAvailable,
  setMediaPlayerModalToggle,
  setMediaPlayerModalFiles,
  setSopperModalToggle,
  setModDetailsModalToggle,
  setSaveAsModalToggle,
  deleteItem,
  setEditItemModalToggle,
  setEditItemModalSubject,
  setEditItemModalContent,
  setEditItemModalFolderData,
  setUploadAttachmentsModalFilesData,
})(EditorReport);
