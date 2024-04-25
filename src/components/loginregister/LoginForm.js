import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Container,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@material-ui/core";
import ValidationTextField from "../ValidationTextField";
import * as Scroll from "react-scroll";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  setLoginUsername,
  setLoginPassword,
  authUser,
  setToggleForm,
} from "../../store/actions/LoginActions";
import { makeStyles } from "@material-ui/core/styles";
import WelcomeHeader from "./WelcomeHeader";
const useStyles = makeStyles((theme) => ({
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

const LoginForm = (props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const scrollToRef = (ref) => {
    var refBoundingClientRect = ref.current.getBoundingClientRect();

    Scroll.animateScroll.scrollTo(
      refBoundingClientRect.top +
        window.scrollY -
        refBoundingClientRect.height -
        30
    );
  };

  let passwordTextFieldRef = React.useRef();
  let submitButtonRef = React.useRef();

  let usernameValidate = null;
  let passwordValidate = null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (props.loading) return;

    let isValid = true;
    if (!usernameValidate()) {
      isValid = false;
    }
    if (!passwordValidate()) {
      isValid = false;
    }
    if (!isValid) return;
    props.authUser(enqueueSnackbar);
  };

  return (
    <Container name="loginContainer" className={classes.formContainer}>
      <WelcomeHeader />
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
            onFocus={()=>{
              scrollToRef(passwordTextFieldRef);
            }}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            value={props.loginUsername}
            validate={(validate) => {
              usernameValidate = validate;
            }}
            disabled={props.isLoading}
            onInput={(e) => props.setLoginUsername(e.target.value)}
            id="usernameTextField"
            label="Username"
            variant="outlined"
            notEmpty={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <ValidationTextField
            className={classes.textField}
            onFocus={()=>{
              scrollToRef(submitButtonRef);
            }}
            ref={passwordTextFieldRef}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            value={props.loginPassword}
            validate={(validate) => {
              passwordValidate = validate;
            }}
            disabled={props.isLoading}
            type="password"
            onInput={(e) => props.setLoginPassword(e.target.value)}
            id="passwordTextField"
            label="Password"
            variant="outlined"
            notEmpty={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            type="submit"
            disabled={props.isLoading}
            className={classes.submitButton}
            ref={submitButtonRef}
          >
            {props.isLoading && <CircularProgress size={25} />}
            {!props.isLoading && "Login"}
          </Button>
        </FormControl>
      </form>
      <Typography align="center">
        <Link
          component="button"
          onClick={() => {
            props.setToggleForm("register");
          }}
        >
          Don't have an account? Register here
        </Link>
      </Typography>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { ...state.LoginReducer };
};
export default connect(mapStateToProps, {
  setLoginUsername,
  setLoginPassword,
  authUser,
  setToggleForm,
})(LoginForm);
