import React, { useEffect } from "react";
import {
  Container,
  Button,
  Input,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  setArchiveSearchModalToggle,
  setSearchInputText,
  setSearchTextType,
} from "../../store/actions/CRUDActions";
import { resolveSettings } from "../../auth/resolveSettings";
import { connect } from "react-redux";
import ArchiveCalenderModal from "../ArchiveCalenderModal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
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
  archiveSearchToggleButton: {
    background: "#EDA525",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#fdaa19",
    },
    padding: "6px 8px",
    minWidth: "0px",
    height: 36,
  },
}));
const SearchBar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <>
      <Box flexGrow={1}>
        <Input
          variant="outlined"
          placeholder="Search"
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
              if (props.searchInputText != "") props.setSearchTextType();
            }
          }}
          value={props.searchInputText}
          onChange={(e) => {
            props.setSearchInputText(e.target.value);
          }}
        />
      </Box>

      <Button
        variant="contained"
        className={classes.searchButton}
        color="primary"
        onClick={() => {
          if (props.searchInputText != "") props.setSearchTextType();
        }}
      >
        <SearchIcon />
      </Button>
      {!(new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
        .makeNoArchieveIncludeInnerFolder) && (
        <>
          <Button
            variant="contained"
            className={classes.archiveSearchToggleButton}
            color="primary"
            onClick={() => {
              props.setArchiveSearchModalToggle(true);
            }}
          >
            <DateRangeIcon />
          </Button>
          <ArchiveCalenderModal></ArchiveCalenderModal>
        </>
      )}
    </>
  );
});
const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.TreeViewReducer,
    ...state.CRUDReducer,
  };
};
export default connect(mapStateToProps, {
  setArchiveSearchModalToggle,
  setSearchInputText,
  setSearchTextType,
})(SearchBar);
