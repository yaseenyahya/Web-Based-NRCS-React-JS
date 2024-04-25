import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { resolveSettings } from "../../auth/resolveSettings";
import EditorReport from "./EditorReport";
import { FolderTypes } from "../../auth/FolderTypes";
import Rundown from "../rundown";
const useStyles = makeStyles((theme) => ({}));
const EditorViewer = React.forwardRef((props, ref) => {
  const classes = useStyles();

  if (props.treeViewItemInfo) {
    let folderType = new resolveSettings().resolveFolderSettings(
      props.treeViewItemInfo.folderId
    ).FolderType;
    return folderType == FolderTypes.Rundowns ? (
      <Rundown
        showSelectionToggleButton={props.showSelectionToggleButton}
        onSelectionNext={props.onSelectionNext}
        onSelectionBack={props.onSelectionBack}
      />
    ) : (
      <EditorReport
        showSelectionToggleButton={props.showSelectionToggleButton}
        onSelectionNext={props.onSelectionNext}
        onSelectionBack={props.onSelectionBack}
      />
    );
  } else return null;
});
const mapStateToProps = (state) => {
  return {
    ...state.TreeViewReducer,
  };
};
export default connect(mapStateToProps, {})(EditorViewer);
