import React, { useRef, useLayoutEffect, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Typography,
  IconButton,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setSaveAsModalToggle,
  saveToFolder,
  setSaveAsModalRadioData,
  setSaveAsModalSelectedFolderInfo,
  setSaveAsModalRadioMainTopContainerHeight,
  setSaveAsModalRadioMainBottomContainerHeight,
} from "../../store/actions/SaveAsModalActions";
import clsx from "clsx";
import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import { useSnackbar } from "notistack";
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
    minWidth: 300,
  },
  radioGroupContainer: {
    paddingTop: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  overflowControl: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  parentFormControlLabel: {
    display: "block",
    background: "#bbb5b5bf",
    marginBottom: 2,
    paddingLeft: 20,
    marginRight: 0,
    color: "black",
    borderBottom: "1px solid gray",
  },
  childrenFormControlLabel: {
    display: "block",
    marginLeft: 20,
    paddingLeft: 20,
    marginRight: 0,
    color: "black",
    borderBottom: "1px solid gray",
    borderLeft: "1px solid gray",
  },
  formControl: {
    display: "block",
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
  submitButtonFormControl:{
    background: "rgb(177 172 172 / 44%)"
  }
}));
const SaveAsModal = (props) => {
  const classes = useStyles();
  const mainTopContainerRef = useRef(null);
  const mainBottomContainerRef = useRef(null);
  const setMainTopBottomContainerHeight = () => {
    if (mainTopContainerRef.current != null) {
      props.setSaveAsModalRadioMainTopContainerHeight(
        mainTopContainerRef.current.clientHeight
      );
    }
    if (mainBottomContainerRef.current != null) {
      props.setSaveAsModalRadioMainBottomContainerHeight(
        mainBottomContainerRef.current.clientHeight
      );
    }
  };
  useEffect(() => {
    setMainTopBottomContainerHeight();
  }, [
    props.userPanelWindowSize.height,
    mainTopContainerRef.current,
    mainBottomContainerRef.current,
    props.saveAsModalToggle,
  ]);
  const folderListWithInnerFolders = new resolveSettings().resolveFolderListWithInnerFoldersWithAllowAddPermission();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.saveAsModalLoading) return;

    if (!props.saveAsModalSelectedFolderInfo)
      enqueueSnackbar("Must select one folder", {
        variant: "error",
      });
      else{
        props.saveToFolder(enqueueSnackbar);
      }
  };
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.saveAsModalToggle}
      onClose={() => {
        props.setSaveAsModalToggle(false);
        props.setSaveAsModalSelectedFolderInfo(null);
      }}
      onEntered={() => {
        setMainTopBottomContainerHeight();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container disableGutters={true} ref={mainTopContainerRef}>
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          <Typography className={classes.titleText} variant="h6">
            Select Folder
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              props.setSaveAsModalToggle(false);
              props.setSaveAsModalSelectedFolderInfo(null);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Container>
      <DialogContent className={classes.dialogContent}>
        <Container disableGutters={true}>
          <form
            noValidate
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <FormControl
              style={{
                height:
                  props.userPanelWindowSize.height -
                  120 -
                  props.saveAsModalRadioMainTopContainerHeight -
                  props.saveAsModalRadioMainBottomContainerHeight,
              }}
              component="fieldset"
              className={clsx(classes.formControl, classes.overflowControl)}
            >
              <RadioGroup
                aria-label="folders"
                name="saveasfolders"
                className={classes.radioGroupContainer}
                onChange={(ref, value) => {
                  let parentId = ref.target.getAttribute("data-parentId");
                  let folderId = value;
                  props.setSaveAsModalSelectedFolderInfo({
                    folderId: folderId,
                    parentId: parentId,
                  });
                }}
              >
                {folderListWithInnerFolders.map((parentFolder) => {
                  return (
                    <div>
                      <FormControlLabel
                        value={parentFolder.id}
                        control={<Radio  inputProps={{
                          "data-parentId": parentFolder.id,
                        }}/>}
                        label={parentFolder.text}
                        disabled={!parentFolder.allowAdd}
                        className={classes.parentFormControlLabel}
                      />

                      {parentFolder.innerFolders.map((childrenFolder) => {
                        return (
                          <FormControlLabel
                            value={childrenFolder.id}
                            control={
                              <Radio
                                inputProps={{
                                  "data-parentId": parentFolder.id,
                                }}
                              />
                            }
                            label={childrenFolder.text}
                            disabled={!childrenFolder.allowAdd}
                            className={classes.childrenFormControlLabel}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Container disableGutters={true} ref={mainBottomContainerRef}>
              <FormControl className={clsx(classes.formControl,classes.submitButtonFormControl)}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={props.saveAsModalLoading}
                  className={classes.submitButton}
                >
                  {props.saveAsModalLoading && <CircularProgress size={25} />}
                  {!props.saveAsModalLoading && "Save"}
                </Button>
              </FormControl>
            </Container>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.SaveAsModalReducer,
    ...state.TreeViewReducer,
    ...state.UserPanelReducer,
  };
};
export default connect(mapStateToProps, {
  setSaveAsModalToggle,
  saveToFolder,
  setSaveAsModalRadioData,
  setSaveAsModalSelectedFolderInfo,
  setSaveAsModalRadioMainTopContainerHeight,
  setSaveAsModalRadioMainBottomContainerHeight,
})(SaveAsModal);
