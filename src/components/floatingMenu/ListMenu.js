import React, { Component } from "react";
import PropTypes from "prop-types";
import IconMenu from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = (theme) => ({
  menuPaper: {
    backgroundColor: "#dea701",
  },
});
class ListMenu extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  menuItemStyles = {
    minWidth: 200,
    textAlign: "center",
    color: "white",
    borderBottom: "1px solid rgb(73, 73, 73)",
  };

  containerStyles = {
    display: "flex",
  };
  render() {
    const { items, iconMenuColor } = this.props;
    const { classes, selectedItemId } = this.props;
    return (
      <div style={this.containerStyles}>
        <IconButton
          onClick={this.handleClick}
          style={{
            ...(iconMenuColor !== undefined ? { color: iconMenuColor } : null),
            margin: "auto",
            padding: 0,
          }}
        >
          <MoreVertIcon
            color={iconMenuColor !== undefined ? iconMenuColor : undefined}
          />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          classes={{ paper: classes.menuPaper }}
          onClose={this.handleClose}
        >
          {items.map((item, i) => (
            <MenuItem
              style={{
                ...this.menuItemStyles,
                ...(selectedItemId == item.id
                  ? this.props.selectedItemStyle
                  : null),
              }}
              key={i}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

ListMenu.propTypes = {
  items: PropTypes.array.isRequired,
  iconMenuColor: PropTypes.string,
};

export default withStyles(useStyles)(ListMenu);
