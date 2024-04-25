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
  setToggleForm,
  setRegisterFullname,
  setRegisterCity,
  setRegisterMobile,
  setRegisterEmail,
  setRegisterChannelname,
  sendMailRegisterUser,
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

const RegisterForm = (props) => {
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

  let cityTextFieldRef = React.useRef();
  let mobileTextFieldRef = React.useRef();
  let emailTextFieldRef = React.useRef();
  let channelTextFieldRef = React.useRef();
  let submitButtonRef = React.useRef();

  let fullnameValidate = null;
  let cityValidate = null;
  let mobileValidate = null;
  let emailValidate = null;
  let channelnameValidate = null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (props.loading) return;

    let isValid = true;
    if (!fullnameValidate()) {
      isValid = false;
    }
    if (!cityValidate()) {
      isValid = false;
    }
    if (!mobileValidate()) {
      isValid = false;
    }
    if (!emailValidate()) {
      isValid = false;
    }
    if (!channelnameValidate()) {
      isValid = false;
    }
    if (!isValid) return;
    props.sendMailRegisterUser(enqueueSnackbar);
  };

  return (
    <Container name="registerContainer" className={classes.formContainer}>
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
            onFocus={() => {
              scrollToRef(cityTextFieldRef);
            }}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            validate={(validate) => {
              fullnameValidate = validate;
            }}
            disabled={props.isLoading}
            onInput={(e) => props.setRegisterFullname(e.target.value)}
            id="fullnameTextField"
            label="Full name"
            variant="outlined"
            notEmpty={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <ValidationTextField
            className={classes.textField}
            onFocus={() => {
              scrollToRef(mobileTextFieldRef);
            }}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            ref={cityTextFieldRef}
            validate={(validate) => {
              cityValidate = validate;
            }}
            disabled={props.isLoading}
            onInput={(e) => props.setRegisterCity(e.target.value)}
            id="cityTextField"
            label="City"
            variant="outlined"
            notEmpty={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <ValidationTextField
            className={classes.textField}
            onFocus={() => {
              scrollToRef(emailTextFieldRef);
            }}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            ref={mobileTextFieldRef}
            validate={(validate) => {
              mobileValidate = validate;
            }}
            mask={[
              "(",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ")",
              " ",
              "-",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            disabled={props.isLoading}
            onInput={(e) => props.setRegisterMobile(e.target.value)}
            id="mobileTextField"
            label="Mobile"
            minValueErrorText="Not a valid mobile number."
            minValue={11}
            variant="outlined"
            notEmpty={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <ValidationTextField
            className={classes.textField}
            onFocus={() => {
              scrollToRef(channelTextFieldRef);
            }}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            ref={emailTextFieldRef}
            validate={(validate) => {
              emailValidate = validate;
            }}
            Email={true}
            disabled={props.isLoading}
            onInput={(e) => props.setRegisterEmail(e.target.value)}
            id="emailTextField"
            label="Email"
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
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            ref={channelTextFieldRef}
            validate={(validate) => {
              channelnameValidate = validate;
            }}
            disabled={props.isLoading}
            onInput={(e) => props.setRegisterChannelname(e.target.value)}
            id="channelnameTextField"
            label="Channel name"
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
            {!props.isLoading && "Create Account"}
          </Button>
        </FormControl>
      </form>
      <Typography align="center">
        <Link
          component="button"
          onClick={() => {
            props.setToggleForm("login");
          }}
        >
          Already have an account?
        </Link>
      </Typography>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { ...state.LoginReducer };
};
export default connect(mapStateToProps, {
  setToggleForm,
  setRegisterFullname,
  setRegisterCity,
  setRegisterMobile,
  setRegisterEmail,
  setRegisterChannelname,
  sendMailRegisterUser,
})(RegisterForm);
