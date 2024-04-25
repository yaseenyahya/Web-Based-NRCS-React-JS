import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  IconButton,
  Button,
  Grid,
  Container,
  Link,
  Menu,
  Box,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import ResponsiveMenu from "../floatingMenu/ResponsiveMenu";
import { resolveSettings } from "../../auth/resolveSettings";
import AllFolderSearchBar from "../crudNavBar/AllFolderSearchBar";
import { connect } from "react-redux";
import {
  setHeaderDrawerOpen,
  setHeaderAnchorEl,
  setDrawerTopContainerHeight,
  setDrawerBottomContainerHeight,
} from "../../store/actions/HeaderActions";
import { setTreeViewSelectedFolderId } from "../../store/actions/TreeViewActions";
import { setSwitchAccountModalToggle } from "../../store/actions/SwitchAccountModalActions";
import { setChangePasswordModalToggle } from "../../store/actions/ChangePasswordActions";
import { resetSearch } from "../../store/actions/CRUDActions";
import { setUserPanelLogout } from "../../store/actions/UserPanelActions";
import ChangePasswordModal from "../changePasswordModal";
import SwitchAccountModal from "../switchAccountModal";
import SearchBar from "../crudNavBar/SearchBar";
import OptionBar from "../crudNavBar/OptionBar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../../auth/auth";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  topContainer: {
    paddingTop: 2,
    paddingBottom: 2,
    color: "black",
  },
  smallScreenMenuContainer: {
    border: "1px solid #c5a1a1",
    background: "white",
  },
  largeScreenMenuContainer: {
    height: 41,
    backgroundColor: "#dea701",
  },
  menuContainer: {
    alignItems: "center",
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawerButtonIcon: {
    fill: "white",
  },
  drawerButton: {
    height: 36,
    padding: "6px 8px",
    minWidth: "0px",
    background: "#e14425",
    borderRadius: 0,
    height: "100%",
    "&:hover": {
      backgroundColor: "#f15031",
    },
  },
  hide: {
    display: "none",
  },
  appBar: {
    backgroundColor: "#decdce",
  },
  appBarHeaderGrid: {
    minHeight: 41,
  },
  usernameGrid: {
    color: "black",
    fontWeight: 600,
  },

  logoutButtonGrid: {
    textAlign: "right",
  },
  logoutLink: {
    color: "black",
    fontWeight: 600,
  },
  logoutGrid: {
    textAlign: "right",
  },
  drawerHeaderGrid: {
    backgroundColor: "#decdce",
    height: 41,
  },
  drawerLogoImg: {
    margin: "5px auto",
  },
  drawerCloseButtonGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerCloseButton: {
    padding: 0,
  },
  menuBox: {
    width: "100%",
  },
  logoImg: {
    display: "block",
    margin: "auto",
  },
  logoContainerLargeScreen: {
    borderRight: "1px solid #d6bdbe",
    borderLeft: "1px solid #d6bdbe",
  },
  logoutDropdownButton: {
    padding: 0,
  },
  changePasswordButton: {},
  rundownButton: {
    background: "#E14425",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#f15031",
    },
    width: "100%",
  },
  changePasswordButton: {
    background: "#499cea",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#599de6",
    },
    padding: "6px 5px",
    width: "100%",
  },
  logoutButton: {
    background: "#EDA525",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#fdaa19",
    },
    minWidth: 0,
  },
  drawerBottomContainer: {
    display: "flex",
  },
  logoutButtonIcon: {
    color: "white",
  },
  drawerMenusContainer: {
    overflow: "auto",
  },
  drawerLogoImgContainer: {
    alignItems: "center",
    display: "flex",
  },
  drawerTopContainer: {
    display: "flex",
    background: "rgb(96 96 96)",
  },
  drawerUsernameContainer: {
    margin: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: 600,
  },
  switchAccountMenu: {
    borderTop: "1px solid #b1aeae",
  },
}));
const Navigation = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const drawerTopContainerRef = useRef(null);
  const drawerBottomContainerRef = useRef(null);

  const values = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };
  React.useEffect(() => {
    if (props.headerDrawerOpen) {
      setTimeout(() => {
        if (
          document.getElementById(
            "drawer-menu-item-" + props.treeViewFolderId
          ) != null
        )
          document
            .getElementById("drawer-menu-item-" + props.treeViewFolderId)
            .scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
      }, 500);
    }
  }, [props.headerDrawerOpen]);
  const resizeScreen = () => {
    if (window.innerWidth >= values.sm) {
      props.setHeaderDrawerOpen(false);
    }
  };
  React.useEffect(() => {
    if (drawerTopContainerRef.current != null) {
      props.setDrawerTopContainerHeight(
        drawerTopContainerRef.current.clientHeight
      );
    }
    if (drawerBottomContainerRef.current != null) {
      props.setDrawerBottomContainerHeight(
        drawerBottomContainerRef.current.clientHeight
      );
    }
  }, [props.userPanelWindowSize.height]);
  React.useEffect(() => {
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  let navList = props.navList || [];
  const getResponsiveMenuItems = () => {
    let navMenus = [];
    navList.map((navItem, i) => {
      navMenus.push({
        text: navItem.text,
        id: navItem.id,
        onClick: () => {
          props.setTreeViewSelectedFolderId(navItem.id);
          props.resetSearch();
        },
      });
    });

    return navMenus;
  };
  const getDrawerMenuItems = () => {
    let navMenus = [];
    const menuItemBorderTopStyles = {
      borderTop: "solid",
      borderTopWidth: 1,
      borderTopColor: "#c1c1c1",
    };
    const menuItemBorderBottomStyles = {
      borderBottom: "solid",
      borderBottomWidth: 1,
      borderBottomColor: "#c1c1c1",
    };
    const SelectedItemStyle = {
      background: "rgb(195 195 195 / 79%)",
      borderBottom: "6px solid rgb(47 104 187)",
    };
    navList.map((navItem, i) => {
      navMenus.push(
        <MenuItem
          id={"drawer-menu-item-" + navItem.id}
          style={{
            ...(props.treeViewFolderId == navItem.id
              ? SelectedItemStyle
              : null),
            ...menuItemBorderTopStyles,
            ...(navList.length - 1 === i && props.treeViewFolderId != navItem.id
              ? menuItemBorderBottomStyles
              : null),
          }}
          selected={true}
          onClick={() => {
            props.setTreeViewSelectedFolderId(navItem.id);
            props.resetSearch();
            props.setHeaderDrawerOpen(false);
          }}
        >
          {navItem.text}
        </MenuItem>
      );
    });

    return navMenus;
  };

  return (
    <>
      <AppBar ref={ref} position="fixed" className={classes.appBar}>
        {!isScreenExtraSmall && !isScreenSmall && (
          <Container className={classes.topContainer}  maxWidth={false}>
            <Grid container>
              <Grid
                className={classes.usernameGrid}
                item
                xs={8}
                sm={8}
                lg={4}
                md={4}
                xl={4}
              >
                {new resolveSettings().resolveName().charAt(0).toUpperCase() +
                  new resolveSettings().resolveName().slice(1)}
              </Grid>
              <Grid
                item
                className={clsx(
                  { [classes.hide]: isScreenSmall },
                  classes.logoContainerLargeScreen
                )}
                lg={4}
                md={4}
                xl={4}
              >
                <img
                  className={classes.logoImg}
                  width={120}
                  src={process.env.PUBLIC_URL + "/axonlogosmall.png"}
                  alt="logo"
                ></img>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                md={4}
                xl={4}
                className={classes.logoutGrid}
              >
                <Link
                  component="button"
                  className={classes.logoutLink}
                  onClick={() => {
                    if (props.switchAccountModalSelectedUser) {
                      auth.removeSwitchAccount();
                      window.location.reload();
                    } else props.setUserPanelLogout();
                  }}
                >
                  {props.switchAccountModalSelectedUser
                    ? "BACK TO ACCOUNT"
                    : "LOGOUT"}
                </Link>
                <IconButton
                  className={classes.logoutDropdownButton}
                  aria-controls="logout-dropdown"
                  aria-haspopup="true"
                  color="primary"
                  aria-label="logout dropdown"
                  component="span"
                  onClick={(event) => {
                    props.setHeaderAnchorEl(event.currentTarget);
                  }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  id="logout-dropdown"
                  anchorEl={props.headerAnchorEl}
                  open={Boolean(props.headerAnchorEl)}
                  onClose={() => {
                    props.setHeaderAnchorEl(null);
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      props.setChangePasswordModalToggle(true);
                      props.setHeaderAnchorEl(null);
                    }}
                    className={classes.changePasswordMenu}
                  >
                    Change Password
                  </MenuItem>
                  {new resolveSettings().resolveDesignation() ==
                    "AllUsersAdmin" && (
                    <MenuItem
                      onClick={() => {
                        props.setSwitchAccountModalToggle(true);
                        props.setHeaderAnchorEl(null);
                      }}
                      className={classes.switchAccountMenu}
                    >
                      Switch Account
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </Container>
        )}
        {new resolveSettings().resolveDesignation() == "AllUsersAdmin" && (
          <SwitchAccountModal />
        )}
        <ChangePasswordModal />
        <Container
          disableGutters={isScreenExtraSmall || isScreenSmall}
          maxWidth={false}
          className={clsx(
            {
              [classes.smallScreenMenuContainer]:
                isScreenExtraSmall || isScreenSmall,
              [classes.largeScreenMenuContainer]:
                !isScreenExtraSmall && !isScreenSmall,
            },
            classes.menuContainer
          )}
        >
          {isScreenExtraSmall || isScreenSmall ? (
            <>
              <Button
                className={classes.drawerButton}
                edge="end"
                onClick={() => {
                  props.setHeaderDrawerOpen(!props.headerDrawerOpen);
                }}
              >
                <MenuIcon className={classes.drawerButtonIcon} />
              </Button>
              <SearchBar />
              <OptionBar />
            </>
          ) : (
            <ResponsiveMenu
              menuWidth={120}
              iconMenuColor="white"
              selectedItemId={props.treeViewFolderId}
              menuList={getResponsiveMenuItems()}
            ></ResponsiveMenu>
          )}
        </Container>
      </AppBar>

      <Drawer
        onBackdropClick={(e) => props.setHeaderDrawerOpen(false)}
        PaperProps={{ style: { width: drawerWidth } }}
        open={props.headerDrawerOpen}
      >
        <Container disableGutters={true} ref={drawerTopContainerRef}>
          <Grid container className={classes.drawerHeaderGrid}>
            <Grid
              className={classes.drawerLogoImgContainer}
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <img
                className={classes.drawerLogoImg}
                width={130}
                src={process.env.PUBLIC_URL + "/axonlogosmall.png"}
                alt="logo"
              ></img>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              className={classes.drawerCloseButtonGrid}
            >
              <IconButton
                className={classes.drawerCloseButton}
                onClick={() => props.setHeaderDrawerOpen(false)}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Container
            disableGutters={true}
            className={classes.drawerTopContainer}
          >
            <Box
              flexGrow={1}
              minWidth={190}
              className={classes.drawerUsernameContainer}
            >
              {new resolveSettings().resolveName().charAt(0).toUpperCase() +
                new resolveSettings().resolveName().slice(1)}
            </Box>
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
                  props.setHeaderDrawerOpen(false);
                }}
              >
                Rundown
              </Button>
            )}
          </Container>
          {new resolveSettings().resolveDesignation() == "AllUsersAdmin" && (
            <>
              <Box flexGrow={1}>
                <Button
                  variant="contained"
                  className={classes.changePasswordButton}
                  color="primary"
                  onClick={() => {
                    props.setSwitchAccountModalToggle(true);
                  }}
                >
                  Switch Account
                </Button>
              </Box>
              <Box flexGrow={1}>
                <AllFolderSearchBar />
              </Box>
            </>
          )}
        </Container>
        <Container
          className={classes.drawerMenusContainer}
          style={{
            height:
              props.userPanelWindowSize.height -
              props.drawerTopContainerHeight -
              props.drawerBottomContainerHeight,
          }}
          disableGutters={true}
        >
          {getDrawerMenuItems()}
        </Container>
        <Container
          ref={drawerBottomContainerRef}
          className={classes.drawerBottomContainer}
          disableGutters={true}
        >
          <Box flexGrow={1}>
            <Button
              variant="contained"
              className={classes.changePasswordButton}
              color="primary"
              onClick={() => {
                props.setChangePasswordModalToggle(true);
                props.setHeaderDrawerOpen(false);
              }}
            >
              Change Password
            </Button>
          </Box>

          <Button
            onClick={() => {
              if (props.switchAccountModalSelectedUser) {
                auth.removeSwitchAccount();
                window.location.reload();
              } else props.setUserPanelLogout();
            }}
            className={classes.logoutButton}
          >
            {props.switchAccountModalSelectedUser ? (
              <ArrowBackIcon className={classes.logoutButtonIcon} />
            ) : (
              <ExitToAppIcon className={classes.logoutButtonIcon} />
            )}
          </Button>
        </Container>
      </Drawer>
    </>
  );
});

Navigation.prototype = {
  navList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ...state.HeaderReducer,
    ...state.TreeViewReducer,
    ...state.UserPanelReducer,
    ...state.SwitchAccountModalReducer,
  };
};
export default connect(
  mapStateToProps,
  {
    setHeaderDrawerOpen,
    setUserPanelLogout,
    setTreeViewSelectedFolderId,
    resetSearch,
    setHeaderAnchorEl,
    setChangePasswordModalToggle,
    setDrawerTopContainerHeight,
    setDrawerBottomContainerHeight,
    setSwitchAccountModalToggle,
  },
  null,
  {
    forwardRef: true,
  }
)(Navigation);
