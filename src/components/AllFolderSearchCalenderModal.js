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
  setAllFolderSearchCalenderModalToggle,
  setArchiveDateTypeModal,
  setArchiveDateInput,
  setAllFolderSearchInputText,
  setAllFolderSearchText,
  setAllFolderSearchDateInput,
  setAllFolderTextDateTypeModal,
  
} from "../store/actions/CRUDActions";
import {
  LocalizationProvider,
  StaticDateRangePicker,
  DateRangeDelimiter,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { SearchTypes } from "./SearchTypes";
import ValidationTextField from "./ValidationTextField";
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
      root: {minHeight: "212px!important"},
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
    padding: 0,
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
  textFieldNotchedOutline: {
    borderWidth: "1px!important",
    top: "0px",
  },
  textFieldInput: {
    padding: "15px 14px 10px 14px",
  },
  textFieldRoot: {
    borderRadius:0,
  
  },
  textField: {
    width: "calc(100% - 5px)",
    /* margin: auto; */
    marginLeft: 2
    
  },
}));
const AllFolderSearchCalenderModal = (props) => {
  
  let allFolderSearchInputValidate = null;
  const classes = useStyles();
  return (
    <Dialog
      open={props.allFolderSearchCalenderModalToggle}
      onClose={() => {
        props.setAllFolderSearchCalenderModalToggle(false);
    
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
          All Folder Search
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            props.setAllFolderSearchCalenderModalToggle(false);
     
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
      <Container disableGutters={true}>
      <ValidationTextField
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
                root:classes.textFieldRoot
              }
            }}
            value={props.allFolderSearchInputText}
            validate={(validate) => {
              allFolderSearchInputValidate = validate;
            }}
            type="text"
            onInput={(e) => props.setAllFolderSearchInputText(e.target.value)}
            id="searchTextField"
            placeholder="Type search text here"
            variant="outlined"
            notEmpty={true}
          />
        </Container>
        <Container disableGutters={true}>
          <LocalizationProvider dateAdapter={MomentUtils} libInstance={moment}>
            <ThemeProvider theme={customCalenderTheme}>
              <StaticDateRangePicker
                allowKeyboardControl={false}
                displayStaticWrapperAs="mobile"
                value={[
                  props.allFolderSearchDateInput[0],
                  props.allFolderSearchDateInput[1],
                ]}
                maxDate={moment()}
                onChange={(newValue) => {
                  props.setAllFolderSearchDateInput(newValue);
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
              if(props.allFolderSearchInputText == "")
              {
                if(!allFolderSearchInputValidate()){
                  return;
                }
              }
              props.setAllFolderTextDateTypeModal(props.allFolderSearchInputText,
                [
                  props.allFolderSearchDateInput[0],
                  props.allFolderSearchDateInput[1] == null
                    ? props.allFolderSearchDateInput[0]
                    : props.allFolderSearchDateInput[1],
                ],SearchTypes.AllFolders,false
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
  setAllFolderSearchCalenderModalToggle,
  setArchiveDateTypeModal,
  setArchiveDateInput,
  setAllFolderSearchInputText,
  setAllFolderSearchText,
  setAllFolderSearchDateInput,
  setAllFolderTextDateTypeModal,
  
})(AllFolderSearchCalenderModal);
