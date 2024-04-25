import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import { setTreeViewSelectedItemInfo } from "../../store/actions/TreeViewActions";
import { connect } from "react-redux";
import EditerViewer from "../editorViewer";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: "0px!important",
  },
}));
const EditorViewerModal = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={props.treeViewItemInfo != null}
      onClose={() => {
        props.setTreeViewSelectedItemInfo(null);
      }}
      scroll={"body"}
      aria-labelledby="scroll-editor-dialog"
      aria-describedby="scroll-editor-dialog"
    >
      <DialogContent className={classes.dialogContent} dividers={false}>
        <EditerViewer
          showSelectionToggleButton={props.showSelectionToggleButton}
          onSelectionNext={props.onSelectionNext}
          onSelectionBack={props.onSelectionBack}
        />
      </DialogContent>
    </Dialog>
  );
});

const mapStateToProps = (state) => {
  return {
    ...state.TreeViewReducer,
  };
};
export default connect(mapStateToProps, {
  setTreeViewSelectedItemInfo,
})(EditorViewerModal);
