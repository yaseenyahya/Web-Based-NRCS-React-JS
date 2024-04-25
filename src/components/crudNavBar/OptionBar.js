import React, { useEffect } from "react";
import { Container, useMediaQuery, IconButton } from "@material-ui/core";

import {
  setArchiveSearchModalToggle,
  setSearchInputText,
  setSearchTextType,
} from "../../store/actions/CRUDActions";
import { resolveSettings } from "../../auth/resolveSettings";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import AddItemModal from "../AddEditItemModal/AddItemModal";
import { setAddItemModalToggle } from "../../store/actions/AddItemModalActions";
import { SearchTypes } from "../SearchTypes";
import clsx from "clsx";
import { FolderTypes } from "../../auth/FolderTypes";
const useStyles = makeStyles((theme) => ({
  buttonDisabled: {
    pointerEvents: "auto!important",
    cursor: "not-allowed!important",
  },

  addNewItemIconButton: {
    padding: "0px",
    color: "rgb(219 61 68)",
    minWidth: 45,
  },
  mainTopContainerBorder: {
    borderRight: "1px solid gray",
  },
  mainTopContainer: {
    display: "flex",
    width: "auto",
  },
}));
const OptionBar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  var allowAddNewItem = true;
 if(props.treeViewFolderId != undefined){

  const folderTypeCurrentTreeView = new resolveSettings().resolveFolderSettings(
    props.treeViewFolderId
  ).FolderType;

  if (
    folderTypeCurrentTreeView == FolderTypes.AllIncomingReview ||
    folderTypeCurrentTreeView== FolderTypes.AllIncomingEnps ||
    folderTypeCurrentTreeView == FolderTypes.Wires ||
    folderTypeCurrentTreeView == FolderTypes.Rundowns ||
    folderTypeCurrentTreeView == FolderTypes.AllIncomingTicker ||
    folderTypeCurrentTreeView == FolderTypes.DeletedItems ||
    folderTypeCurrentTreeView == FolderTypes.AllIncomingReviewRSR ||
    folderTypeCurrentTreeView == FolderTypes.AllIncomingEnpsTicker ||
    folderTypeCurrentTreeView == FolderTypes.AllIncomingEnpsBureauPitch ||
    folderTypeCurrentTreeView == FolderTypes.AllIncomingTicker
  ) {
    allowAddNewItem = false;
  }
}
  return (
    <Container
      disableGutters={true}
      style={{marginLeft:props.searchType == SearchTypes.AllFolders ? 0 : "auto"}}
      className={clsx(classes.mainTopContainer, {
        [classes.mainTopContainerBorder]: !isScreenExtraSmall && !isScreenSmall,
      })}
    >
      <IconButton
        onClick={() => {
          props.setAddItemModalToggle(true);
        }}
        aria-label="Add"
        className={clsx(
          { [classes.buttonDisabled]: !allowAddNewItem },
          classes.addNewItemIconButton
        )}
        disabled={!allowAddNewItem  || !new resolveSettings().resolveUserAddPermission() }
      >
        <AddIcon></AddIcon>
      </IconButton>
      {allowAddNewItem && <AddItemModal />}
    </Container>
  );
});
const mapStateToProps = (state) => {
  return {
    ...state.TreeViewReducer,
    ...state.CRUDReducer,
  };
};
export default connect(mapStateToProps, {
  setArchiveSearchModalToggle,
  setSearchInputText,
  setSearchTextType,
  setAddItemModalToggle,
})(OptionBar);
