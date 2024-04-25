import React, { useEffect } from "react";
import { Button, useMediaQuery } from "@material-ui/core";
import { setAllFolderSearchCalenderModalToggle } from "../../store/actions/CRUDActions";
import { resolveSettings } from "../../auth/resolveSettings";
import { connect } from "react-redux";
import AllFolderSearchCalenderModal from "../AllFolderSearchCalenderModal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  archiveSearchToggleButton: {
    background: "#606060",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#797777",
    },
    padding: "6px 8px",
    minWidth: "0px",
    height: 36,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
const AllFolderSearchBar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <>
      <Button
        variant="contained"
        className={classes.archiveSearchToggleButton}
        color="primary"
        onClick={() => {
          props.setAllFolderSearchCalenderModalToggle(true);
        }}
      >
        All Folder Search
      </Button>
      <AllFolderSearchCalenderModal></AllFolderSearchCalenderModal>
    </>
  );
});

export default connect(null, {
  setAllFolderSearchCalenderModalToggle,
})(AllFolderSearchBar);
