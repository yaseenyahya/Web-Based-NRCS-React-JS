import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setAddItemModalToggle,
  setAddItemModalLoading,
  setAddItemModalSelectedFolderId,
  setAddItemModalFolderData,
  setAddItemModalSubject,
  setAddItemModalContent,
  resetAddItemModal,
  setAddItemModalMainTopContainerHeight,
  setAddItemModalMainMiddleContainerHeight,
  setAddItemModalMainBottomContainerHeight,
  addItemToFolder,
} from "../../store/actions/AddItemModalActions";
import { resetUploadAttachmentsModal } from "../../store/actions/UploadAttachmentsModalActions";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useSnackbar } from "notistack";
import ValidationSelectField from "../ValidationSelectField";
import ValidationTextField from "../ValidationTextField";
import ValidationTextArea from "../ValidationTextArea";
import { resolveSettings } from "../../auth/resolveSettings";
import { uploadFileStatusType } from "../UploadAttachmentsModal/uploadFileStatusType";
import uploadIncludes from "../UploadAttachmentsModal/includes";
import { setUploadAttachmentsModalToggle } from "../../store/actions/UploadAttachmentsModalActions";
import UploadAttachmentsModal from "../UploadAttachmentsModal";
import includes from "../editorViewer/includes";
import PrintButton from "../PrintButton";
import CopyButton from "../CopyButton";
import { useReactToPrint } from "react-to-print";
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
    fontWeight: 600,
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
  submitButton: {
    fontSize: 17,
    width: "100%",
    borderRadius: 0,
    background: "#E14425",
    color: "#FFFFFF",

    "&:hover": {
      backgroundColor: "#f15031",
    },
  },
  subFolderSelect: {
    width: "100%",
    padding: "5px 13px",
    border: "1px solid #969090",
    "&:before": {
      borderBottom: "0!important",
    },
    "&:after": {
      borderBottom: "0!important",
    },
  },
  contentContainer: {
    overflow: "auto",
    padding: "0px 10px",

  },
  subFolderContainer: {},
  textFieldNotchedOutline: {
    borderWidth: "0!important",
    top: "0px",
  },

  onErrorTextFieldInputRoot: {
    border: "1px solid red",
    borderRadius: "0!important",
  },
  textFieldInputRoot: {
    width: "100%",
    border: "1px solid #969090",
    borderRadius: "0!important",
    "&:before": {
      borderBottom: "0!important",
    },
    "&:after": {
      borderBottom: "0!important",
    },
    padding: "0",
  },
  textField: { width: "100%" },
  textFieldInput: {
    width: "100%",
    border: 0,
    height: "1.1876em",
    margin: 0,
    display: "block",
    padding: 11.3,
  },
  textArea: {
    width: "100%",
    padding: 0,
    fontWeight: 400,
    font: "inherit",
    border: 0,
    outline: 0,
    resize: "none",
    height: "100%",
    "&::placeholder": {
      color: "rgb(177, 177, 177)",
    },
    unicodeBidi: "plaintext",
    fontSize: 25,
    fontFamily: "system-ui",
    overflowX: "hidden",
  },
  textAreaLabel: {
    position: "absolute",
    margin: "20px",
    background: "#db3d44",
    padding: "3px 6px",
    color: "white",
    borderBottom: "4px solid #272727",
    borderRadius: "3px",
    "&::before": {
      top: "-4px",
      width: "20px",
      height: "10px",
      position: "absolute",
      transform: "skew(130deg)",
      background: "#db3d44",
      borderRadius: "8px",
      right: 0,
      content: "''",
    },
  },
  subjectContainer: {
    padding: 10,
    display: "flex",
  },
  subFolderContainer: {
    padding: 10,
  },
  textFieldFormHelperText: {
    marginLeft: 0,
  },
  uploadAttachmentsToggleButton: {
    background: "#EDA525",
    borderRadius: 0,
    padding: 0,
    fontSize: 19,
    color: "white",
    "&:hover": {
      backgroundColor: "#ec9600",
    },
    minWidth: 65,
    height: "43.59px",
  },
  uploadAttachmentsToggleIcon: {
    width: 19,
    height: 19,
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
    zIndex: 1000,
    bottom: 52,
    right: 10,
    background: "#80808096",
  },
  copyButtonContainer: {
    position: "absolute",
    zIndex: 0,
    bottom: 55,
    left: 10,
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
const AddItemModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const printContainer = useRef(null);
  const mainTopContainerRef = useRef(null);
  const mainMiddleContainerRef = useRef(null);
  const mainBottomContainerRef = useRef(null);

  
  const { enqueueSnackbar } = useSnackbar();
  let subFolderValidate = null;
  let subjectValidate = null;
  let slugValidate = null;
  const handleSubmit = () => {
    if (props.addItemModalLoading) return;
    let isValid = true;
    if (!subFolderValidate()) {
      isValid = false;
    }
    if (!subjectValidate()) {
      isValid = false;
    }
    if (!slugValidate()) {
      isValid = false;
    }

    delaySetMainTopMiddleBottomContainerHeight();
    if (isValid) props.addItemToFolder(enqueueSnackbar);
  };
  useEffect(() => {
    setMainTopMiddleBottomContainerHeight();
  }, [
    props.userPanelWindowSize.height,
    mainTopContainerRef.current,
    mainMiddleContainerRef.current,
    mainBottomContainerRef.current,
  ]);
  const setMainTopMiddleBottomContainerHeight = () => {
    if (mainTopContainerRef.current != null) {
      props.setAddItemModalMainTopContainerHeight(
        mainTopContainerRef.current.clientHeight
      );
    }
    if (mainMiddleContainerRef.current != null) {
      props.setAddItemModalMainMiddleContainerHeight(
        mainMiddleContainerRef.current.clientHeight
      );
    }
    if (mainBottomContainerRef.current != null) {
      props.setAddItemModalMainBottomContainerHeight(
        mainBottomContainerRef.current.clientHeight
      );
    }
  };
  const delaySetMainTopMiddleBottomContainerHeight = () => {
    setTimeout(() => {
      setMainTopMiddleBottomContainerHeight();
    }, 200);
  };
  const uploadAttachmentUploadedStatusCount = new uploadIncludes().getUploadFilesbyStatus(
    props.uploadAttachmentsModalFilesData,
    uploadFileStatusType.uploaded
  ).length;
  const handlePrint = useReactToPrint({
    content: () => printContainer.current,
  });
  return (
    <Dialog
      fullScreen={true}
      scroll={"body"}
      classes={{ paper: classes.dialogPaper }}
      open={props.addItemModalToggle}
      onEntered={() => {
        setMainTopMiddleBottomContainerHeight();
      }}
      onClose={() => {
        props.setAddItemModalToggle(false);
        props.resetAddItemModal();
        props.resetUploadAttachmentsModal();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container maxWidth={true} disableGutters={true} ref={mainTopContainerRef}>
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          <Typography className={classes.titleText} variant="h6">
            Add Report
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              props.setAddItemModalToggle(false);
              props.resetAddItemModal();
              props.resetUploadAttachmentsModal();
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Container>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.hiddenContainer}>
          <div ref={printContainer} className={classes.printContainer}>
            <h1 className={classes.printSubjectContainer}>
              {props.addItemModalSubject}
            </h1>
            <h4 className={classes.printContentContainer}>
              {props.addItemModalContent}
            </h4>
          </div>
        </div>
        <Container maxWidth={true} disableGutters={true} ref={mainMiddleContainerRef}>
          <Grid container className={classes.drawerHeaderGrid}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Container
                disableGutters={true}
                className={classes.subFolderContainer}
              >
                <ValidationSelectField
                  className={classes.subFolderSelect}
                  validate={(validate) => {
                    subFolderValidate = validate;
                  }}
                  onChange={(event) => {
                    delaySetMainTopMiddleBottomContainerHeight();
                    props.setAddItemModalSelectedFolderId(
                      event.target.value.id
                    );
                  }}
                  placeHolderValue={"Select Sub-Folder"}
                  menuItems={new resolveSettings().resolveInnerFoldersWithAllowAddPermission(
                    props.treeViewFolderId
                  )}
                  notEmpty={
                    !new resolveSettings().resolveAllowAddPermissionByFolderId(
                      props.treeViewFolderId
                    )
                  }
                />
              </Container>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Container
                disableGutters={true}
                className={classes.subjectContainer}
              >
                <Box flexGrow={1}>
                  <ValidationTextField
                    variant="outlined"
                    validate={(validate) => {
                      subjectValidate = validate;
                    }}
                    onInput={(e) => {
                      delaySetMainTopMiddleBottomContainerHeight();
                      props.setAddItemModalSubject(e.target.value);
                    }}
                    FormHelperTextProps={{
                      classes: { root: classes.textFieldFormHelperText },
                    }}
                    className={classes.textField}
                    onErrorInputRootClass={classes.onErrorTextFieldInputRoot}
                    InputProps={{
                      classes: {
                        input: classes.textFieldInput,
                        root: classes.textFieldInputRoot,
                        notchedOutline: classes.textFieldNotchedOutline,
                      },
                    }}
                    placeholder={"Type Subject"}
                    notEmpty={true}
                  />
                </Box>
                <Button
                  onClick={() => {
                    props.setUploadAttachmentsModalToggle(true);
                  }}
                  className={classes.uploadAttachmentsToggleButton}
                >
                  <AttachFileIcon
                    className={classes.uploadAttachmentsToggleIcon}
                  />
                  {uploadAttachmentUploadedStatusCount}
                </Button>
                <UploadAttachmentsModal />
              </Container>
            </Grid>
          </Grid>
        </Container>
        <Container
          disableGutters={true}
          maxWidth={true}
          className={classes.contentContainer}
          style={{
            height:
              props.userPanelWindowSize.height -
              props.addItemModalMainTopContainerHeight -
              props.addItemModalMainMiddleContainerHeight -
              props.addItemModalMainBottomContainerHeight,
          }}
        >
          <Typography className={classes.durationTextContainer}>
            Duration: {new includes().calculateTL(props.addItemModalContent)}
          </Typography>

          <ValidationTextArea
            labelClassName={classes.textAreaLabel}
            className={classes.textArea}
            onChange={(e) => {
              props.setAddItemModalContent(e.target.value);
            }}
            notEmpty={true}
            placeholder={"Type Slug"}
            validate={(validate) => {
              slugValidate = validate;
            }}
          />
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(props.addItemModalContent)

            }}
            containerClassName={classes.copyButtonContainer}
          />
          <PrintButton
            onClick={() => {
              // alert("asd")
              handlePrint();
            }}
            printButtonContainerClassName={classes.printButtonContainer}
          />
        </Container>
        <Container maxWidth={true} disableGutters={true} ref={mainBottomContainerRef}>
          <Button
            variant="contained"
            type="submit"
            disabled={props.addItemModalLoading}
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            {props.addItemModalLoading && <CircularProgress size={25} />}
            {!props.addItemModalLoading && "Save"}
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.AddItemModalReducer,
    ...state.UserPanelReducer,
    ...state.TreeViewReducer,
    ...state.UploadAttachmentsModalReducer,
  };
};
export default connect(mapStateToProps, {
  setAddItemModalToggle,
  setAddItemModalLoading,
  setAddItemModalSelectedFolderId,
  setAddItemModalFolderData,
  setAddItemModalSubject,
  setAddItemModalContent,
  resetAddItemModal,
  setAddItemModalMainTopContainerHeight,
  setAddItemModalMainMiddleContainerHeight,
  setAddItemModalMainBottomContainerHeight,
  addItemToFolder,
  setUploadAttachmentsModalToggle,
  resetUploadAttachmentsModal,
})(AddItemModal);
