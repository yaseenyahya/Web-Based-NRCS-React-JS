import React, { useRef, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Typography,
  Button,
  TableContainer,
  Paper,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { MDBDataTable } from "mdbreact";
import SearchIcon from "@material-ui/icons/Search";
import {
  setRundownData,
  setRundownHeaderText,
  setRundownLoading,
  setRundownSelectedItemData,
  setRundownTableData,
  setRundownMainTopPanelHeight,
} from "../../store/actions/RundownActions";
import { setTreeViewSelectedItemInfo } from "../../store/actions/TreeViewActions";
import clsx from "clsx";
import { FolderTypes } from "../../auth/FolderTypes";
import ApiCalls from "../../api/ApiCalls";
import { rundownDataColumn } from "./rundownDataColumn";
import includes from "./includes";
import { resolveSettings } from "../../auth/resolveSettings";
import RundownEditorDialog from "./RundownEditorDialog";
import _ from "lodash";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RundownMenuButton from "../RundownMenuButton";
import otherMethods from "../../otherMethods"
const useStyles = makeStyles((theme) => ({
  closeButton: {
    background: "#499cea",
    color: "white",
    padding: 0,
    borderRadius: 0,

    "&:hover": {
      backgroundColor: "#2e87da",
    },
  },
  mainTopContainer: {
    background: "#808080",
    display: "flex",
  },
  rundownTableContainer: {
    overflow: "auto",
  },
  headerText: {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  },
  rundwonDataLoading: {
    color: "#db3d44",
    margin: "auto",
  },
  LoadingCenter: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  rundownHeaderTableCell: {
    padding: "2px 7px",
    text: "break-all",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: "#c9ddff",
    overflow: "hidden",
    borderRight: "1px solid #adcef7",
    fontWeight: "bold",
    textAlign: "center",
  },
  rundownBodyTableCell: {
    padding: 2,
    text: "break-all",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    border: "1px solid #bfbfbf",
    textAlign: "center",
  },
  rundownBodyTableRow: {
    background: "#f1f8ff",
    cursor: "pointer",

    "&:hover": {
      boxShadow: "inset 20px -10px 20px 8px #ead11952",
    },
  },
  searchIcon: {
    color: "#db3d44",
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
}));
const Rundown = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));

  var mainTopContainerRef = React.useRef();
  useEffect(() => {
    if (mainTopContainerRef.current != null) {
      props.setRundownMainTopPanelHeight(
        mainTopContainerRef.current.clientHeight
      );
    }
  }, [
    props.userPanelWindowSize,
    props.rundownLoading,
    props.rundownMainTopPanelHeight,
  ]);
  const treeViewItemInfo = useRef(null);
  treeViewItemInfo.current = props.treeViewItemInfo;

  var rundownDataTimer = useRef(null);
  useEffect(() => {
    if (rundownDataTimer.current != null) {
      clearInterval(rundownDataTimer.current);
    }
    props.setRundownLoading(true);

    rundownDataTimer.current = setInterval(() => {
      getRundownData(props.treeViewItemInfo.id);
    }, 2000);
  }, [props.treeViewItemInfo]);

  useEffect(() => {
    return () => {
      if (rundownDataTimer.current != null) {
        clearInterval(rundownDataTimer.current);
      }
    };
  }, []);
  const getRundownData = (itemId) => {
    ApiCalls.getRundownAndInfoByID(itemId)
      .then((responseJson) => {
        if (itemId == treeViewItemInfo.current.id) {
          if (responseJson.Data != null) {
            props.setRundownData(responseJson.Data.rundownDataList);
            props.setRundownLoading(false);
            props.setRundownHeaderText(
              responseJson.Data.rundownName +
              " [" +
              responseJson.Data.startDate +
              "-" +
              responseJson.Data.startDateShortDate +
              "] - [" +
              responseJson.Data.startTime +
              "-" +
              responseJson.Data.endTime +
              "]"
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const tableColumns = new includes().makeRundownColumnToUserDefined(
    rundownDataColumn,
    props.searchText == "" ? props.allFolderSearchText : props.searchText,
    new resolveSettings().resolveRundownOtherSettings()
  );

  return (
    <Container
      disableGutters={true}
      maxWidth={true}
      style={{
        height:
          props.userPanelWindowSize.height -
          (isScreenExtraSmall || isScreenSmall
            ? 0
            : props.userPanelNavbarHeight) -
          props.crudPanelheight -
          2,
      }}
      className={clsx(classes.mainContainer, {
        [classes.LoadingCenter]: props.rundownLoading,
      })}
    >
      {props.rundownLoading ? (
        <CircularProgress
          className={classes.rundwonDataLoading}
        ></CircularProgress>
      ) : (
        <Container disableGutters={true} maxWidth={true}>
          <RundownEditorDialog treeViewItemInfo={props.treeViewItemInfo}/>
          <Container
            ref={mainTopContainerRef}
            disableGutters={true}
            maxWidth={true}
            className={classes.mainTopContainer}
          >
            <RundownMenuButton onExcelExport={()=>{
              
              ApiCalls.getDataForExcelExportRundown(
                props.treeViewItemInfo.id
              )
                .then((responseJson) => {
                  if (responseJson.Data != null) {
                    var fileName = new resolveSettings().resolveFolderNameById(
                      props.treeViewFolderId
                    ) + ".xls";
                    new otherMethods().exportXls(
                      fileName,
                      responseJson.Data
                    )
                  }
                })
                .catch((error) => {
                  alert("Error while exporting")
                });
            }}/>
            <Box flexGrow={1}>
              <Typography className={classes.headerText}>
                {props.rundownHeaderText}
              </Typography>
            </Box>

            <Button
              onClick={() => {
                if (rundownDataTimer.current != null) {
                  clearInterval(rundownDataTimer.current);
                }
                props.setRundownData(null);
                props.setTreeViewSelectedItemInfo(null);
                props.setRundownLoading(true);
                //
              }}
              className={classes.closeButton}
            >
              <CloseIcon />
            </Button>
          </Container>
          <Container disableGutters={true} maxWidth={true} className={classes.bottomContainer}>
            {props.showSelectionToggleButton && (
              <Container
                disableGutters={true}
                className={classes.selectionToggleContainerButton}
              >
                <Button
                  onClick={props.onSelectionNext}
                  className={classes.selectionBackButton}
                >
                  <ArrowUpwardIcon
                    className={classes.selectionBackIconButton}
                  />{" "}
                </Button>
                <Button
                  onClick={props.onSelectionBack}
                  className={classes.selectionNextButton}
                >
                  <ArrowDownwardIcon
                    className={classes.selectionNextIconButton}
                  />{" "}
                </Button>
              </Container>
            )}
            <TableContainer
              className={classes.rundownTableContainer}
              style={{
                height:
                  props.userPanelWindowSize.height -
                  (isScreenExtraSmall || isScreenSmall
                    ? 0
                    : props.userPanelNavbarHeight) -
                  props.crudPanelheight -
                  props.rundownMainTopPanelHeight -
                  2,
              }}
            >
              <Table
                className={classes.rundownRable}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {tableColumns.map((col) => {
                      return (
                        <TableCell
                          style={{ maxWidth: col.width }}
                          className={classes.rundownHeaderTableCell}
                        >
                          {col.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {new includes()
                    .bindRundownData(
                      props.rundownData,
                      props.searchText == "" ? props.allFolderSearchText : props.searchText,
                      tableColumns
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          key={row.rowID}
                          className={classes.rundownBodyTableRow}
                          style={row.rowStyle}
                          onClick={() => {
                            if (row.rowID != new includes().endRowIndex) {
                              let rowData = _.find(
                                props.rundownData,
                                (item) => item.rid == row.rowID
                              );
                              if (rowData != undefined)
                                props.setRundownSelectedItemData(rowData);
                            }
                          }}
                        >
                          {row.data.map((cell) => {
                            return (
                              <TableCell
                                style={{...cell.cellStyle,fontSize:props.rundownFontSize + "px"}}
                                className={classes.rundownBodyTableCell}
                              >
                                {cell.text == "showSearchIcon" ? (
                                  <SearchIcon
                                    className={classes.searchIcon}
                                  ></SearchIcon>
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
          </Container>
        </Container>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.TreeViewReducer,
    ...state.UserPanelReducer,
    ...state.RundownReducer,
    ...state.CRUDReducer,
  };
};
export default connect(mapStateToProps, {
  setRundownData,
  setRundownHeaderText,
  setRundownTableData,
  setRundownLoading,
  setRundownSelectedItemData,
  setTreeViewSelectedItemInfo,
  setRundownMainTopPanelHeight,
})(Rundown);
