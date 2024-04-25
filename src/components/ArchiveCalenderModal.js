import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Container,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  setArchiveSearchModalToggle,
  setArchiveDateTypeModal,
  setArchiveDateInput,
} from "../store/actions/CRUDActions";
import {
  LocalizationProvider,
  StaticDateRangePicker,
  DateRangeDelimiter,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { SearchTypes } from "./SearchTypes";
const customCalenderTheme = createMuiTheme({
  overrides: {
    MuiPickersStaticWrapper: {
      root: {},
    },
    MuiToolbar: {
      root: {
        padding: "0px 17px!important",
      },
    },
    MuiPickersSlideTransition: {
      root: {},
    },
    MuiPickersDateRangePickerToolbarProps: {
      penIcon: {
        paddingTop: 0,
      },
    },
    MuiPickersCalendar: {
      weekDayLabel: {
        color: "#6b6b6b",
        fontWeight: 800,
        background: "#c1bfbf",
        height: "auto",
      },
    },
    MuiPickersStaticWrapper: {
      root: {
        minWidth: "auto",
        padding: "2px",
      },
    },
  },
  palette: {
    primary: {
      main: "rgb(219, 61, 68)",
      contrastText: "#ffffff",
      // This is an orange looking color
    },

    text: {
      primary: "#000000",
      secondary: "#8c8c8c",
    },
    secondary: {
      main: "#ffcc80", //Another orange-ish color
    },
  },
});
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
  dialogContent: {
    padding: "5px 0 0px 0",
  },
  searchButton: {
    width: "100%",
    background: "#499cea",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#599de6",
    },
    color: "white",
  },
}));
const ArchiveCalenderModal = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.archiveSearchModalToggle}
      onClose={() => {
        props.setArchiveSearchModalToggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{
          background: "#db3d44",
          color: "white",
          padding: 3,
        }}
        id="alert-dialog-title"
      >
        {" "}
        <Typography className={classes.titleText} variant="h6">
          Archive Search
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setArchiveSearchModalToggle(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Container disableGutters={true}>
          <LocalizationProvider dateAdapter={MomentUtils} libInstance={moment}>
            <ThemeProvider theme={customCalenderTheme}>
              <StaticDateRangePicker
                allowKeyboardControl={false}
                displayStaticWrapperAs="mobile"
                value={[
                  props.archiveSearchDateInput[0],
                  props.archiveSearchDateInput[1],
                ]}
                maxDate={moment()}
                onChange={(newValue) => {
                  props.setArchiveDateInput(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <DateRangeDelimiter> to </DateRangeDelimiter>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </ThemeProvider>
          </LocalizationProvider>
          <Button
            onClick={() => {
              props.setArchiveDateTypeModal(
                [
                  props.archiveSearchDateInput[0],
                  props.archiveSearchDateInput[1] == null
                    ? props.archiveSearchDateInput[0]
                    : props.archiveSearchDateInput[1],
                ],
                props.archiveSearchDateInput[0].isSame(moment()) &&
                  props.archiveSearchDateInput[1] == null
                  ? null
                  : SearchTypes.Archive,
                false
              );
            }}
            variant="contained"
            className={classes.searchButton}
          >
            Search
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.CRUDReducer };
};
export default connect(mapStateToProps, {
  setArchiveSearchModalToggle,
  setArchiveDateTypeModal,
  setArchiveDateInput,
})(ArchiveCalenderModal);
