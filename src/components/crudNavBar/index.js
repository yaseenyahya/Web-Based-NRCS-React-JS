import React, { useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setTreeViewSelectedFolderId } from "../../store/actions/TreeViewActions";
import {
  resetSearch,
  setCrudPanelHeight,
} from "../../store/actions/CRUDActions";

import { resolveSettings } from "../../auth/resolveSettings";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import OptionBar from "./OptionBar";
import AllFolderSearchBar from "./AllFolderSearchBar";
import { SearchTypes } from "../SearchTypes";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    borderBottom: "1px solid #bbbbbb",
    overflow: "hidden",
    display: "flex",
  },
  rundownButton: {
    background: "#E14425",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#f15031",
    },
    float: "right",
    height: 36,
  },
}));
const CRUDNavBar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  var mainContainerRef = React.useRef();
  useEffect(() => {
    return () => {
      props.setCrudPanelHeight(0);
    };
  }, []);
  useEffect(() => {
    props.setCrudPanelHeight(mainContainerRef.current.clientHeight);
  }, [props.userPanelWindowSize.height]);
  return (
    <Container
      ref={mainContainerRef}
      className={classes.mainContainer}
      disableGutters={true}
      maxWidth={true}
    >
      <OptionBar />
      {props.searchType == SearchTypes.AllFolders ? null : <SearchBar />}
      <AllFolderSearchBar />
      {new resolveSettings().resolveShowRundown() && (
        <Button
          variant="contained"
          className={classes.rundownButton}
          color="primary"
          onClick={() => {
            props.setTreeViewSelectedFolderId(
              new resolveSettings().resolveRundownId()
            );
            props.resetSearch();
          }}
        >
          Show Rundown
        </Button>
      )}
    </Container>
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
  setTreeViewSelectedFolderId,
  resetSearch,
  setCrudPanelHeight,
})(CRUDNavBar);
