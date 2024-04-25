import React from "react";
import PropTypes from "prop-types";
import ContainerDimensions from "react-container-dimensions";
import IconButton from "@material-ui/core/IconButton";
import ListMenu from "./ListMenu.js";
import MenuItem from "@material-ui/core/MenuItem";
const styles = {
  menu_container: {
    display: "flex",
    width: "100%",
    //justifyContent: "flex-end",
    margin: 0,
    padding: 0,
  },
};
const menuItemStyles = {
  justifyContent: "center",
  display: "flex",
  textOverflow: "ellipsis",
  paddingLeft: 6,
  paddingRight: 6,
  borderRight: "solid",
  borderRightWidth: 1,
  borderRightColor: "#494949",
};
const SelectedItemStyle = {
  background: "rgb(96 96 96)",
  borderBottom: "2px solid #decdce"
}
const getIcon = (item, i, width, selectedItemId) => {
  if (item.seperator) {
    return undefined;
  } else if (item.menu) {
    return item.getSelectMenuItems();
  } else {
    const borderRight =
      i == 0
        ? {
            borderLeft: "solid",
            borderLeftWidth: 1,
            borderLeftColor: "#494949",
          }
        : null;
 
    return (
      <MenuItem
        style={
          {
            width: width,
            height: 41,
            ...menuItemStyles,
            ...borderRight,
            ...(selectedItemId == item.id ? SelectedItemStyle: null),
            overflow:"inherit"
          }
          
        }
        disableGutters="true"
        key={i}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        {item.text}
      </MenuItem>
    );
  }
};

const Menu = (props) => {
  const {
    iconMenuColor,
    width,
    marginCorrection,
    menuWidth,
    menuList,
    selectedItemId,
  } = props;

  let icons = [];
  let menus = [];

  const visibleItems = menuList.filter((item) => item.hidden !== true);
  const mWidth = menuWidth !== undefined ? menuWidth : 130;
  const correction = marginCorrection !== undefined ? marginCorrection : 220;
  const breackLimit = visibleItems.length * mWidth;

  const hiddenWidth = breackLimit - width - correction;
  const hiddenMenus = Math.ceil(hiddenWidth / mWidth) + 1;

  if (hiddenMenus > 0) {
    menus = visibleItems.slice(
      visibleItems.length - hiddenMenus,
      visibleItems.length
    );
    icons = visibleItems.slice(0, hiddenMenus * -1);
  } else {
    menus = [];
    icons = visibleItems;
  }

  return (
    <div style={styles.menu_container}>
      {icons.map((item, i) => getIcon(item, i, mWidth, selectedItemId))}

      {menus.length != 0 && (
        <ListMenu
          selectedItemId={selectedItemId}
          items={menus}
          iconMenuColor={iconMenuColor}
          selectedItemStyle = {SelectedItemStyle}
        />
      )}
    </div>
  );
};

const ResponsiveMenu = (props) => {
  return (
    <ContainerDimensions>
      {({ width }) => <Menu width={width} {...props} />}
    </ContainerDimensions>
  );
};

ResponsiveMenu.propTypes = {
  menuList: PropTypes.array.isRequired,
  menuWidth: PropTypes.number,
  marginCorrection: PropTypes.number,
};

export default ResponsiveMenu;
