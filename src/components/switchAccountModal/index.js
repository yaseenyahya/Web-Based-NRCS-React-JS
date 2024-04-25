import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Typography,
  IconButton,
  Input,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { auth } from "../../auth/auth";
import {
  setSwitchAccountModalToggle,
  setSwitchAccountModalSearchTextInput,
  setSwitchAccountModalSearchText,
  setSwitchAccountModalTableData,
  setSwitchAccountModalSelectedUser,
  setSwitchAccountModalLoading,
  setSwitchAccountModalMainTopContainerHeight,
  switchAccountModalSearch,
  setSwitchAccountModalSearchTableData,
  resetSwitchAccountModal,
} from "../../store/actions/SwitchAccountModalActions";
import {
  setUserPanelRedirectToPath
} from "../../store/actions/UserPanelActions";
import {
  setLoginUsername,
  setLoginPassword,
  authUser,
} from "../../store/actions/LoginActions";
import clsx from "clsx";
import ApiCalls from "../../api/ApiCalls";
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from "@material-ui/icons/Launch";
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
  },
  switchAccountModalContainerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  switchAccountModalCircularProgress: {
    color: "#db3d44",
  },
  SwitchAccountModalTableContainer: {
    overflow: "auto",
  },
  switchAccountModalHeaderTableCell: {
    padding: "2px 7px",
    text: "break-all",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    background: "#c9ddff",
    overflow: "hidden",
    borderRight: "1px solid #adcef7",
    fontWeight: "bold",
    textAlign: "center",
    wordBreak: "break-all",
  },
  switchAccountModalBodyTableCell: {
    padding: 2,
    text: "break-all",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    overflow: "hidden",
    border: "1px solid #bfbfbf",
    textAlign: "center",
    wordBreak: "break-all",
  },
  switchAccountModalBodyTableRow: {
    background: "#f1f8ff",
    cursor: "pointer",

    "&:hover": {
      boxShadow: "inset 20px -10px 20px 8px #ead11952",
    },
  },
  tableButton: {
    background: "#E14425",
    borderRadius: 0,
    color: "white",
    "&:hover": {
      backgroundColor: "#f15031",
    },
    minWidth: "auto",
    padding: 4,
  },
  searchInputRoot: {
    width: "100%",
  },
  searchInput: {
    height: 36,
    borderRight: "1px solid #bdbdbd",
    padding: "0 4px",
    borderBottom: 0,
  },
  searchInputUnderline: {
    borderBottom: "0!important",
    "&:hover, &:hover&:after,  &:hover&:before": {
      borderBottom: "1px solid #499cea",
    },
    "&:after": {
      borderBottom: "1px solid #599de6",
    },
  },
  searchInputFocused: {
    borderBottom: "1px solid #499cea",
    "&:hover": {
      borderBottom: "1px solid #499cea",
    },
  },
  searchResetButton: {
    background: "#499cea",
    borderRadius: 0,
    padding: "0 0 0 8px",
    minWidth: "0px",
    "&:hover": {
      backgroundColor: "#599de6",
    },
  },
  searchResetButtonIcon: {
    color: "white",
  },
  searchButton: {
    background: "#499cea",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#599de6",
    },
    height: 36,
    padding: "6px 8px",
    minWidth: "0px",
  },
  searchBarContainer: {
    display: "flex",
  },
}));
const SwitchAccountModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const mainTopContainerRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  const setSwitchAccountModalMainTopContainerHeight = ()=>{
    if (mainTopContainerRef.current != null) {
      props.setSwitchAccountModalMainTopContainerHeight(
        mainTopContainerRef.current.clientHeight
      );
    }
  }
  useEffect(() => {
    setSwitchAccountModalMainTopContainerHeight();
  }, [
    props.userPanelWindowSize.height,
    mainTopContainerRef.current,
    props.switchAccountModalLoading,
  ]);

  useEffect(() => {
    if (props.switchAccountModalToggle) {
      props.setSwitchAccountModalLoading(true);
      getSwitchAccountUsers();
    }
  }, [props.switchAccountModalToggle]);

  const getSwitchAccountUsers = () => {
    ApiCalls.getSwitchAccountUsers()
      .then((responseJson) => {
        if (responseJson.Data != null) {
          let usersDataTableData = [];

          responseJson.Data.map((users) => {
            usersDataTableData.push({
              rowID: users.id,
              data: [
                { text: users.name },
                { text: users.fname },
                { text: users.username },
                { text: users.password },
                { text: "Switch Account", type: "button" },
              ],
            });
          });
          props.setSwitchAccountModalTableData(usersDataTableData);
          props.setSwitchAccountModalLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        getSwitchAccountUsers();
      });
  };
  const modalContentWidth = props.userPanelWindowSize.width;
  const modalContentHeight = props.userPanelWindowSize.height;

  const switchAccountModalBindData =
    props.switchAccountModalSearchTableData != null
      ? props.switchAccountModalSearchTableData
      : props.switchAccountModalTableData;
  return (
    <Dialog
      fullScreen={true}
      scroll={"body"}
      classes={{ paper: classes.dialogPaper }}
      open={props.switchAccountModalToggle}
      onEntered={() => {
        setSwitchAccountModalMainTopContainerHeight();
      }}
      onClose={() => {
        props.setSwitchAccountModalToggle(false);
        props.setSwitchAccountModalLoading(true);
        props.resetSwitchAccountModal();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container disableGutters={true} ref={mainTopContainerRef}>
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          <Typography className={classes.titleText} variant="h6">
            Switch Account
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              props.setSwitchAccountModalToggle(false);
              props.setSwitchAccountModalLoading(true);
              props.resetSwitchAccountModal();
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Container disableGutters={true} className={classes.searchBarContainer}>
          {props.switchAccountModalSearchTableData && (
            <Button
              className={classes.searchResetButton}
              onClick={() => {
                props.setSwitchAccountModalSearchText("");
                props.setSwitchAccountModalSearchTextInput("");
                props.setSwitchAccountModalSearchTableData(null);
              }}
            >
              <ArrowBackIcon className={classes.searchResetButtonIcon} />
            </Button>
          )}
          <Box flexGrow={1}>
            <Input
              variant="outlined"
              placeholder="Search"
              value={props.switchAccountModalSearchTextInput}
              classes={{
                root: classes.searchInputRoot,
                input: classes.searchInput,
                underline: classes.searchInputUnderline,
                focused: classes.searchInputFocused,
              }}
              inputProps={{
                "aria-label": "description",
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  if (props.switchAccountModalSearchTextInput != "")
                    props.switchAccountModalSearch();
                }
              }}
              value={props.switchAccountModalSearchTextInput}
              onChange={(e) => {
                props.setSwitchAccountModalSearchTextInput(e.target.value);
              }}
            />
          </Box>

          <Button
            variant="contained"
            className={classes.searchButton}
            color="primary"
            onClick={() => {
              if (props.switchAccountModalSearchTextInput != "")
                props.switchAccountModalSearch();
            }}
          >
            <SearchIcon />
          </Button>
        </Container>
      </Container>
      <DialogContent className={classes.dialogContent}>
        <div
          style={{
            height: props.switchAccountModalLoading
              ? modalContentHeight -
                props.switchAccountModalMainTopContainerHeight
              : "auto",
          }}
          className={clsx({
            [classes.switchAccountModalContainerFlex]:
              props.switchAccountModalLoading,
          })}
        >
          {props.switchAccountModalLoading ? (
            <CircularProgress
              className={classes.switchAccountModalCircularProgress}
            ></CircularProgress>
          ) : (
            <TableContainer
              className={classes.SwitchAccountModalTableContainer}
              style={{
                height:
                  modalContentHeight -
                  props.switchAccountModalMainTopContainerHeight,
              }}
            >
              <Table
                className={classes.switchAccountTable}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {[
                      { label: "Name", width: modalContentWidth / 5 },
                      { label: "Fathername", width: modalContentWidth / 5 },
                      { label: "Username", width: modalContentWidth / 5 },
                      { label: "Password", width: modalContentWidth / 5 },
                      { label: "", width: modalContentWidth / 5 },
                    ].map((col) => {
                      return (
                        <TableCell
                          style={{ width: col.width }}
                          className={classes.switchAccountModalHeaderTableCell}
                        >
                          {col.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {switchAccountModalBindData.map((row) => {
                    return (
                      <TableRow
                        key={row.rowID}
                        className={classes.switchAccountModalBodyTableRow}
                        style={row.rowStyle}
                      >
                        {row.data.map((cell) => {
                          return (
                            <TableCell
                              className={
                                classes.switchAccountModalBodyTableCell
                              }
                            >
                              {cell.type == "button" ? (
                                <Button
                                  className={classes.tableButton}
                                  onClick={() => {
                                    props.setSwitchAccountModalToggle(false);
                                    props.setSwitchAccountModalLoading(true);
                                    props.resetSwitchAccountModal();

                                    props.setSwitchAccountModalSelectedUser({
                                      username: row.data[2].text,
                                      password: row.data[3].text,
                                    });
                                    auth.setToSwitchAccount();
                                    props.setUserPanelRedirectToPath("/loginregister");
                                    props.setLoginUsername(row.data[2].text);
                                    props.setLoginPassword(row.data[3].text);
                                    props.authUser(enqueueSnackbar);
                                  }}
                                >
                                  {isScreenSmall || isScreenExtraSmall ? (
                                    <LaunchIcon />
                                  ) : (
                                    cell.text
                                  )}
                                </Button>
                              ) : (
                                cell.text
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.SwitchAccountModalReducer, ...state.UserPanelReducer };
};
export default connect(mapStateToProps, {
  setSwitchAccountModalToggle,
  setSwitchAccountModalSearchTextInput,
  setSwitchAccountModalSearchText,
  setSwitchAccountModalTableData,
  setSwitchAccountModalSelectedUser,
  setSwitchAccountModalLoading,
  setSwitchAccountModalMainTopContainerHeight,
  switchAccountModalSearch,
  setSwitchAccountModalSearchTableData,
  resetSwitchAccountModal,
  setUserPanelRedirectToPath,
  setLoginUsername,
  setLoginPassword,
  authUser,
})(SwitchAccountModal);
