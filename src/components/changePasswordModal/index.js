import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  FormControl,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  setChangePasswordModalToggle,
  submitChangePassword,
  setChangePasswordOldPassword,
  setChangePasswordNewPassword,
} from "../../store/actions/ChangePasswordActions";
import ValidationTextField from "../ValidationTextField";
import * as Scroll from "react-scroll";
import { useSnackbar } from "notistack";
import { resolveSettings } from "../../auth/resolveSettings";
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
  formContainer: {
    background: "rgb(177 172 172 / 44%)",
    borderRadius: "5px",
    width: "100%",
    padding: "40px",
    "-webkit-box-shadow": "-2px 1px 9px 4px rgba(184,184,184,1)",
    "-moz-box-shadow": "-2px 1px 9px 4px rgba(184,184,184,1)",
    "box-shadow": "-2px 1px 9px 4px rgba(184,184,184,1)",
    margin: "15px 0",
  },

  form: {
    display: "block",
    marginBottom: "15px",
    marginTop: "15px",
    marginRight: 15,
    marginLeft: 15,
  },
  textField: {
    width: "100%",
  },
  submitButton: {
    fontSize: 17,
    width: "100%",
    background: "#E14425",
    color: "#FFFFFF",

    "&:hover": {
      backgroundColor: "#f15031",
    },
  },
  textFieldNotchedOutline: {
    borderWidth: "1px!important",
    top: "0px",
  },
  textFieldInput: {
    padding: "15px 14px",
  },
  formControl: {
    display: "block",
    marginBottom: "15px",
    marginTop: "15px",
  },
}));
const ChangePasswordModal = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const scrollToRef = (ref) => {
    var refBoundingClientRect = ref.current.getBoundingClientRect();
    dialogContentRef.current.scrollTop =
      refBoundingClientRect.top +
      dialogContentRef.current.getBoundingClientRect().top -
      dialogContentRef.current.getBoundingClientRect().height -
      30;
  };

  let newPasswordTextFieldRef = React.useRef();
  let submitButtonRef = React.useRef();

  let oldPasswordValidate = null;
  let newPasswordValidate = null;

  const dialogContentRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (props.changePasswordIsLoading) return;

    let isValid = true;
    if (!oldPasswordValidate()) {
      isValid = false;
    }
    if (!newPasswordValidate()) {
      isValid = false;
    }
    if (!isValid) return;
    props.submitChangePassword(
      new resolveSettings().resolveUserId(),
      enqueueSnackbar
    );
  };
  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={props.changePaswordModalToggle}
      onClose={() => {
        props.setChangePasswordModalToggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        <Typography className={classes.titleText} variant="h6">
          Change Password
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setChangePasswordModalToggle(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} ref={dialogContentRef}>
        <div
          style={{
           padding:3
          }}
        >
          <form
            noValidate
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <FormControl className={classes.formControl}>
              <ValidationTextField
                className={classes.textField}
                focus={(focus) => focus()}
                onFocus={() => {
                  scrollToRef(newPasswordTextFieldRef);
                }}
                InputProps={{
                  classes: {
                    input: classes.textFieldInput,
                    notchedOutline: classes.textFieldNotchedOutline,
                  },
                }}
                validate={(validate) => {
                  oldPasswordValidate = validate;
                }}
                type="password"
                disabled={props.isLoading}
                onInput={(e) =>
                  props.setChangePasswordOldPassword(e.target.value)
                }
                id="oldPasswordTextField"
                label="Old Password"
                variant="outlined"
                notEmpty={true}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <ValidationTextField
                className={classes.textField}
                onFocus={() => {
                  scrollToRef(submitButtonRef);
                }}
                ref={newPasswordTextFieldRef}
                InputProps={{
                  classes: {
                    input: classes.textFieldInput,
                    notchedOutline: classes.textFieldNotchedOutline,
                  },
                }}
                validate={(validate) => {
                  newPasswordValidate = validate;
                }}
                disabled={props.isLoading}
                type="password"
                onInput={(e) =>
                  props.setChangePasswordNewPassword(e.target.value)
                }
                id="newPasswordTextField"
                label="New Password"
                variant="outlined"
                notEmpty={true}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                type="submit"
                disabled={props.changePasswordIsLoading}
                className={classes.submitButton}
                ref={submitButtonRef}
              >
                {props.changePasswordIsLoading && (
                  <CircularProgress size={25} />
                )}
                {!props.changePasswordIsLoading && "Change Password"}
              </Button>
            </FormControl>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.ChangePasswordReducer, ...state.UserPanelReducer };
};
export default connect(mapStateToProps, {
  setChangePasswordModalToggle,
  submitChangePassword,
  setChangePasswordOldPassword,
  setChangePasswordNewPassword,
})(ChangePasswordModal);
