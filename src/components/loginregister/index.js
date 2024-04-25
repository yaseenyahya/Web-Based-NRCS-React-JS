import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import { auth } from "../../auth/auth";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { AnimateGroup } from "react-animation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "../../store/actions/DialogActions";
const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/background.png"})`,
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
  },

  logoImg: {
    width: "70%",
    display: "block",
    margin: "auto",
  },
  logoImgSmallScreen: {
    display: "block",
    margin: "auto",
    marginBottom: "15px",
    marginTop: "5px",
    width: "50%",
  },
  fullHeight: {
    minHeight: "100vh",
  },
}));

const LoginRegister = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {

    auth.removeStartupFolderId();
    auth.removeIsAuthenticated();
    auth.removeAuthSettings();

    if (props.switchAccountModalSelectedUser == null)
      auth.removeSwitchAccount();

    return;
  }, []);

  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      props.setDialogOpen(true);

      props.setDialogContent(props.location.state.error);
      props.setDialogOkText("OK");
      props.setDialogOkClick(() => {
        props.setDialogOpen(false);
       window.location = "/";

      });
      props.setDialogCancelText(null);

    }
  }, [props.location.state])
  useEffect(() => {
    if (props.toggleFormName == "login") document.title = props.titleLogin;
    else document.title = props.titleRegister;
  }, [props.toggleFormName]);

  const redirectTo = (props.location.state != undefined &&
    props.location.state.from) || { pathname: props.loginRedirectToPath };


  if (props.loginRedirectToPath) {
    return <Redirect to={redirectTo} />;
  }

  const logoImg = (
    <img
      className={clsx({
        [classes.logoImgSmallScreen]: isScreenExtraSmall || isScreenSmall,
        [classes.logoImg]: !isScreenExtraSmall && !isScreenSmall,
      })}
      src={process.env.PUBLIC_URL + "/axonlogolarge.png"}
      alt="logo"
    ></img>
  );

  return (
    <Container maxWidth={false} className={clsx(classes.headerContainer, classes.fullHeight)}>
      <Container disableGutters={true}>
        <Grid
          direction={isScreenExtraSmall || isScreenSmall ? "column" : "row"}
          container
          className={classes.fullHeight}
          alignItems={"center"}
        >
          {!isScreenSmall && !isScreenExtraSmall ? (
            <Grid item xs={0} sm={0} md={6} lg={6} xl={6}>
              {logoImg}
            </Grid>
          ) : null}
          <Grid item alignContent="center" xs={12} sm={12} md={6} lg={6} xl={6}>
            {isScreenSmall || isScreenExtraSmall ? logoImg : null}
            <AnimateGroup animation="fade">
              {props.toggleFormName == "login" ? (
                <LoginForm key="login" />
              ) : (
                <RegisterForm key="register" />
              )}
            </AnimateGroup>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { ...state.LoginReducer, ...state.SwitchAccountModalReducer };
};
export default connect(mapStateToProps, {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent
})(LoginRegister);
