import React, { useEffect } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  setEditorViewFontSize
} from "../store/actions/EditorViewActions";
import clsx from "clsx";
import {
  IconButton,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
    display:"flex"
  },
  menuPaper: {
    color: "rgb(219 61 68)",
    strokeDasharray: 100,
    position: "absolute",
    transition: "all 300ms ease-in-out",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  subMenuPaper: {
    borderTopLeftRadius: 0,
    boxShadow: "none"
  },
  menuIcon: {
    color: "black"
  },
  menuItem: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: "black"
  },
  subMenuItem: {
    color: "black",
    width: 50
  },
  itemTypography: {
    display: "flex",
    alignItems: "center"
  },
  menuArrow: {
    fontSize: 16,
    marginLeft: 10
  }, selectedFontSize: {
    background: "#d1d1d1"
  }
}));
const EditorMenuButton = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
  const handleClose = () => {
    setSubMenuAnchorEl(null);
    setAnchorEl(null);

  };

  const fontItemSelected = (fontSize) => {
    props.setEditorViewFontSize(fontSize);

    localStorage.setItem("EditorFontSize",fontSize);
    handleClose();
  }
  const fontSizes = [30,36, 42, 48, 54];

  return (
    <div className={classes.container} style={props.containerStyle}>
      <IconButton
        id="font-button"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);

        }}
        aria-controls={Boolean(anchorEl) ? 'list-font-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        style={{

          margin: "auto",
          padding: 0,
        }}
      >
        <MoreVertIcon className={classes.menuIcon}
        />
      </IconButton>
      <Menu
        id="list-font-menu"
        MenuListProps={{
          'aria-labelledby': 'font-button',
        }}
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        classes={{ paper: classes.menuPaper }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          className={classes.menuItem}

          onClick={(event) => {
            setSubMenuAnchorEl(event.currentTarget);

          }}
        ><span className={classes.itemTypography}>Font Size <ArrowForwardIosIcon className={classes.menuArrow} /></span>
        </MenuItem>
          <Menu

            onClose={handleClose}
            classes={{ paper: classes.subMenuPaper }}
            anchorEl={subMenuAnchorEl}
            open={Boolean(subMenuAnchorEl)}
            keepMounted
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}

          >

            {fontSizes.map((fontSize) => {

              return <MenuItem
                className={clsx(
                  { [classes.selectedFontSize]: fontSize == props.editorViewFontSize },
                  classes.subMenuItem)}
                onClick={() => {
                  fontItemSelected(fontSize);

                }}
              >{fontSize}</MenuItem>
            })}



          </Menu>


      </Menu>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state.EditorViewReducer,

  };
};
export default connect(mapStateToProps, {
  setEditorViewFontSize
})(EditorMenuButton);

