import React, { useEffect } from "react";
import {
  Container,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
  Tooltip,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import Header from "../header/Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SplitterLayout from "../react-splitter-layout/components/SplitterLayout";
import "../react-splitter-layout/stylesheets/index.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "../../store/actions/DialogActions";
import {
  setUserPanelNavbarHeight,
  setUserPanelTitleContainerHeight,
  setuserPanelWindowSize,
} from "../../store/actions/UserPanelActions";
import {
  setTreeViewData,
  setTreeViewLoading,
  setTreeViewSelectedItemInfo,
  setTreeViewToggleGroupView,
} from "../../store/actions/TreeViewActions";
import SuperTreeview from "../react-treeview";
import { resolveSettings } from "../../auth/resolveSettings";
import pollFolderData from "../folderDataFeeder/pollFolderData";
import resolveSearchFolderData from "../folderDataFeeder/resolveSearchFolderData";
import resolveArchiveSearchFolderData from "../folderDataFeeder/resolveArchiveSearchFolderData";
import resolveAllFolderSearchData from "../folderDataFeeder/resolveAllFolderSearchData";
import { TreeviewType } from "../react-treeview/TreeviewType";
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import compact from "lodash/compact";
import CRUDNavBar from "../crudNavBar";
import clsx from "clsx";
import { resetSearch } from "../../store/actions/CRUDActions";
import { SearchTypes } from "../SearchTypes";
import EditerViewer from "../editorViewer";
import { FolderTypes } from "../../auth/FolderTypes";
import EditorViewerModal from "../editorViewer/EditorViewerModal";
import _ from "lodash";
import { auth } from "../../auth/auth";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import FolderTitleMenuButton from "../FolderTitleMenuButton";
import ApiCalls from "../../api/ApiCalls";
import moment from "moment";
import otherMethods from "../../otherMethods"
const useStyles = makeStyles((theme) => ({
  selectedFoldertitleContainer: {
    background: "rgb(32,124,229)",
    background:
      "linear-gradient(0deg, rgba(73,156,234,1) 0%, rgba(89,157,230,1) 35%, rgba(32,124,229,1) 100%)",
    padding: "8px 0",
    color: "white",
    display: "flex",
  },
  mainContainer: {
    background: "white",
  },
  searchBackButton: {
    color: "white",
    padding: 2,
    marginLeft: 10,
  },
  selectedFoldertitle: {
    verticalAlign: "middle",
    paddingLeft: 20,
    fontSize: 19,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 600,
    marginTop: 1,
    display: "block"
  },
  borderLeft: {
    borderLeft: "1px solid #99b1ca",
  },
  toggleGroupViewIconButton: {
    padding: 3,
    color: "white",
    marginRight: 6,
  },
  toggleGroupViewIconButtonIcon: {
    width: 22.3,
  },
}));
const UserPanel = (props) => {
  const classes = useStyles();
  var navRef = React.useRef();
  var titleContainerRef = React.useRef();
  var splitterLayoutRef = React.useRef();
  var superTreeviewRef = React.useRef();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  //save Ref to treeViewData to get updated treeViewData
  let treeViewFolderId = React.useRef();
  treeViewFolderId.current = props.treeViewFolderId;

  let searchType = React.useRef();
  searchType.current = props.searchType;

  let archiveSearchDate = React.useRef();
  archiveSearchDate.current = props.archiveSearchDate;

  let treeViewData = React.useRef([]);
  treeViewData.current = props.treeViewData;
  /////

  let pollFolderDataObj = React.useRef(null);
  let resolveSearchFolderDataObj = React.useRef(null);
  let resolveArchiveSearchFolderDataObj = React.useRef(null);

  let resolveAllFolderSearchDataObj = React.useRef(null);

  let previousResolveArchiveSearchFolderDataObj = null;
  let previousResolveAllFolderSearchDataObj = null;
  const checkIsLoggedIn = async()=>{
  try{
     ApiCalls.callLoginApi(
       new resolveSettings().resolveUsername(),
       new resolveSettings().resolvePassword(),
       false
     ).then((responseJson) => {
       if (responseJson.Data.haveError) {
      
        
         props.setDialogOpen(true);

         props.setDialogContent(responseJson.Data.error);
         props.setDialogOkText("OK");
         props.setDialogOkClick(() => {
           props.setDialogOpen(false);
           auth.removeStartupFolderId();
           auth.removeIsAuthenticated();
           auth.removeAuthSettings();
           window.location.reload();
         });
         props.setDialogCancelText(null);
   
       
       }
     });
   }catch(ex){
   
   }
 }
  useEffect(() => {

    const interval = setInterval(() => {
      checkIsLoggedIn();
    }, 5000); 
 
    if (props.switchAccountModalSelectedUser == null)
      auth.removeSwitchAccount();

    document.title = props.title;

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      if (pollFolderDataObj.current) pollFolderDataObj.current.stop();
    };
  }, []);
  useEffect(() => {
    if (splitterLayoutRef.current)
      splitterLayoutRef.current.splitterVisible();
    if (props.searchType == null) {
      if (pollFolderDataObj && pollFolderDataObj.current != null) {
        pollFolderDataObj.current.stop();
      }
      props.setTreeViewData([]);
      props.setTreeViewLoading(true);
      pollFolderDataObj.current = new pollFolderData(
        props.treeViewFolderId,
        props.setTreeViewData,
        () => {
          return treeViewData.current;
        },
        props.setTreeViewLoading
      );
    }
  }, [props.treeViewFolderId, props.searchType]);

  useEffect(() => {

    if (
      props.searchType != null &&
      props.searchType == SearchTypes.AllFolders
    ) {
      stopAllSearch();
      if (pollFolderDataObj && pollFolderDataObj.current != null) {
        pollFolderDataObj.current.stop();
      }

      props.setTreeViewData([]);
      props.setTreeViewLoading(true);

      if (pollFolderDataObj && pollFolderDataObj.current != null) {
        pollFolderDataObj.current.stop();
        pollFolderDataObj.current = null;
        resolveAllFolderSearchDataObj.current = null;
      }

      previousResolveAllFolderSearchDataObj =
        resolveAllFolderSearchDataObj.current;

      resolveAllFolderSearchDataObj.current = new resolveAllFolderSearchData(
        props.treeViewFolderId,
        props.allFolderSearchDate,
        props.allFolderSearchText,
        props.setTreeViewData,
        props.setTreeViewLoading
      );
    }
  }, [props.allFolderSearchText, props.allFolderSearchDate]);

  useEffect(() => {
    if (
      props.searchType != null &&
      props.searchType != SearchTypes.AllFolders
    ) {
      stopAllSearch();
      if (props.searchType == SearchTypes.Current) {
        previousResolveArchiveSearchFolderDataObj = null;
        resolveArchiveSearchFolderDataObj.current = null;
        if (pollFolderDataObj && pollFolderDataObj.current != null) {
          pollFolderDataObj.current.pause(); //to keep data updating
        }
      } else {
        if (pollFolderDataObj && pollFolderDataObj.current != null) {
          pollFolderDataObj.current.stop();
        }
      }
      props.setTreeViewData([]);
      props.setTreeViewLoading(true);
      if (props.searchType == SearchTypes.Current) {
        resolveSearchFolderDataObj.current = new resolveSearchFolderData(
          props.treeViewFolderId,
          props.searchText,
          props.setTreeViewData,
          props.setTreeViewLoading,
          async (folderId) => {
            while (
              pollFolderDataObj.current.isFirstDataFetch &&
              folderId == props.treeViewFolderId &&
              searchType.current == SearchTypes.Current
            ) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            return pollFolderDataObj.current.data;
          }
        );
      } else if (props.searchType == SearchTypes.Archive) {
        if (pollFolderDataObj && pollFolderDataObj.current != null) {
          pollFolderDataObj.current.stop();
          pollFolderDataObj.current = null;
          resolveSearchFolderDataObj.current = null;
        }

        previousResolveArchiveSearchFolderDataObj =
          resolveArchiveSearchFolderDataObj.current;

        resolveArchiveSearchFolderDataObj.current = new resolveArchiveSearchFolderData(
          props.treeViewFolderId,
          props.archiveSearchDate,
          props.searchText,
          props.setTreeViewData,
          props.setTreeViewLoading,

          async (folderId, archiveSearchDate_) => {
            while (
              !previousResolveArchiveSearchFolderDataObj.isDataFetch &&
              folderId == props.treeViewFolderId &&
              searchType.current == SearchTypes.Archive &&
              archiveSearchDate.current[0].isSame(archiveSearchDate_[0]) &&
              archiveSearchDate.current[1].isSame(archiveSearchDate_[1])
            ) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            return previousResolveArchiveSearchFolderDataObj.archiveData;
          }
        );
      }
    }
  }, [props.searchText, props.archiveSearchDate]);
  const stopAllSearch = () => {
    if (
      resolveAllFolderSearchDataObj &&
      resolveAllFolderSearchDataObj.current != null
    ) {
      resolveAllFolderSearchDataObj.current.stop();
    }
    if (
      resolveSearchFolderDataObj &&
      resolveSearchFolderDataObj.current != null
    ) {
      resolveSearchFolderDataObj.current.stop();
    }
    if (
      resolveArchiveSearchFolderDataObj &&
      resolveArchiveSearchFolderDataObj.current != null
    ) {
      resolveArchiveSearchFolderDataObj.current.stop();
    }
  };
  function handleResize() {
    props.setuserPanelWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }
  useEffect(() => {
    if (navRef.current != null)
      props.setUserPanelNavbarHeight(navRef.current.clientHeight);
    if (titleContainerRef.current != null)
      props.setUserPanelTitleContainerHeight(
        titleContainerRef.current.clientHeight
      );
  }, [props.userPanelWindowSize]);

  if (props.userPanelRedirectToPath) {
    return <Redirect to={{ pathname: props.userPanelRedirectToPath }} />;
  }
  const setTreeViewSelectedItem = (node, depth) => {
    if (node.type == TreeviewType.Child) {
      let data = [].concat(
        ...treeViewData.current.map((obj) => {
          if (obj.type == TreeviewType.Parent) return obj.children;
          else return obj;
        })
      );
      data = compact(data); //remove empty arrays
      const prevSelectedNode = find(data, (node) => node.isSelected);
      if (prevSelectedNode != undefined)
        prevSelectedNode.isSelected = undefined;
      const currentNode = find(data, node);

      if (currentNode != undefined) {
        currentNode.isSelected = true;
        if (currentNode.isHighlight != undefined)
          currentNode.isHighlight = undefined;
      }
      // props.setTreeViewData([]);
      props.setTreeViewData(cloneDeep(treeViewData.current));

      var itemInfo = {
        id: node.id,
        folderId: props.treeViewFolderId,
        info: null,
      };
      /// mixedType object available on allfoldersearch
      if (node.mixedType == "Report") {

        let data = resolveAllFolderSearchDataObj.current.allFolderData;
        let item = _.find(data, (ele) => ele.id == node.id);
        if (item != undefined) {
          itemInfo.info = item;
          itemInfo.folderId = item.mainfolderid;
        }
      } else {
        let folderType = new resolveSettings().resolveFolderSettings(
          props.treeViewFolderId
        ).FolderType;
        if (folderType != FolderTypes.Rundowns) {
          let data = null;
          if (props.searchType == SearchTypes.Archive) {
            data = resolveArchiveSearchFolderDataObj.current.archiveData;
            let item = _.find(data, (ele) => ele.id == node.id);
            if (item != undefined) {
              itemInfo.info = item;
            }
          } else {
            data = pollFolderDataObj.current.data;
            let item = _.find(data, (ele) => ele.id == node.id);
            if (item != undefined) {
              itemInfo.info = item;
            }
          }
        }
      }
      props.setTreeViewSelectedItemInfo(itemInfo);
    }
  };

  const SuperTreeViewVar = (
    <SuperTreeview
      noChildrenStyle={{ fontSize: props.treeViewFontSize + "px" }}
      rowStyle={{ fontSize: props.treeViewFontSize + "px", height: props.treeViewFontSize > 24 ? 40 : props.treeViewFontSize > 21 ? 37 : 35 }}
      ref={superTreeviewRef}
      layoutHeight={
        props.userPanelWindowSize.height -
        props.userPanelNavbarHeight -
        props.userPanelTitleContainerHeight
      }
      isLoading={props.treeViewLoading}
      onItemClick={setTreeViewSelectedItem}
      isExpandable={(node, depth) => {
        return node.children != undefined && node.children.length > 0;
      }}
      isDeletable={(node, depth) => {
        return false;
      }}
      isCheckable={(node, depth) => {
        return false;
      }}
      isShowCount={(node, depth) => {
        return node.type == TreeviewType.Parent;
      }}
      data={props.treeViewData}
      onUpdateCb={(updatedData) => {
        props.setTreeViewData(updatedData);
        // this.setState({data: updatedData})
      }}
    ></SuperTreeview >
  );
  const onSelectionNext = () => {
    let data = [].concat(
      ...treeViewData.current.map((obj) => {
        if (obj.type == TreeviewType.Parent) return obj.children;
        else return obj;
      })
    );
    data = compact(data);
    let totalDataLength = data.length;
    let selectedNodeIndex = findIndex(data, (node) => node.isSelected);
 
    if (selectedNodeIndex != -1) selectedNodeIndex--;
    else selectedNodeIndex = totalDataLength - 1;

    if (selectedNodeIndex == -1) selectedNodeIndex = totalDataLength - 1;

    let parentNode = find(treeViewData.current, (node) => {
      return node.id == data[selectedNodeIndex].parentId;
    });

    const prevExpandedNode = find(
      treeViewData.current,
      (node) => node.isExpanded
    );
    if (prevExpandedNode != undefined) prevExpandedNode.isExpanded = undefined;

    if (parentNode != undefined) parentNode.isExpanded = true;

    setTimeout(() => {
      if (
        document.getElementById(
          "super-treeview-item-" + data[selectedNodeIndex].id
        ) != null
      ) {
        if (superTreeviewRef.current != null) {
          superTreeviewRef.current.treeViewRef.scrollTop =
            document.getElementById(
              "super-treeview-item-" + data[selectedNodeIndex].id
            ).offsetTop -
            superTreeviewRef.current.treeViewRef.offsetTop -
            50;
        }
      }
    }, 200);
    setTreeViewSelectedItem(data[selectedNodeIndex], null);
  };
  const  onSelectionBack = () => {
 
    let data = [].concat(
      ...treeViewData.current.map((obj) => {
        if (obj.type == TreeviewType.Parent) return obj.children;
        else return obj;
      })
    );
    data = compact(data);
    let totalDataLength = data.length;
    let selectedNodeIndex = findIndex(data, (node) => node.isSelected);

    if (selectedNodeIndex != -1) selectedNodeIndex++;
    else selectedNodeIndex = 0;

    if (selectedNodeIndex > totalDataLength - 1) selectedNodeIndex = 0;

    let parentNode = find(treeViewData.current, (node) => {
      return node.id == data[selectedNodeIndex].parentId;
    });

    const prevExpandedNode = find(
      treeViewData.current,
      (node) => node.isExpanded
    );
    if (prevExpandedNode != undefined) prevExpandedNode.isExpanded = undefined;

    if (parentNode != undefined) parentNode.isExpanded = true;
    setTimeout(() => {
      if (
        document.getElementById(
          "super-treeview-item-" + data[selectedNodeIndex].id
        ) != null
      ) {
        if (superTreeviewRef.current != null) {
          superTreeviewRef.current.treeViewRef.scrollTop =
            document.getElementById(
              "super-treeview-item-" + data[selectedNodeIndex].id
            ).offsetTop -
            superTreeviewRef.current.treeViewRef.offsetTop -
            50;
        }
      }
    }, 200);

    setTreeViewSelectedItem(data[selectedNodeIndex], null);
  };
  const FolderItemContainer = (
    <div
      tabIndex={0}
      style={{ outline: "none" }}
      onKeyDown={(e) => {
        if (e.keyCode == 38) {
          onSelectionBack();
          //back
        } else if (e.keyCode == 40) {
          //next
          onSelectionNext();
        }
      }}
    >
      <Container
        ref={titleContainerRef}
        className={classes.selectedFoldertitleContainer}
        disableGutters={true}

      >
        {props.searchType && (
          <IconButton
            aria-label="close"
            className={classes.searchBackButton}
            onClick={() => {
              props.resetSearch();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <FolderTitleMenuButton onExcelExport={() => {


          if (props.searchType == SearchTypes.AllFolders || props.searchType == null) {
            ApiCalls.getDataForExcelExport(
              resolveAllFolderSearchDataObj.current == null ? new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
                .FolderType : FolderTypes.Search,
              props.treeViewFolderId
              ,
              new resolveSettings().resolveUserId(),
              new resolveSettings().resolveMainFolderIdsWithCommas(),
              resolveAllFolderSearchDataObj.current != null ?
                resolveAllFolderSearchDataObj.current.allFolderSearchText :
                null,
              resolveAllFolderSearchDataObj.current != null ?
                resolveAllFolderSearchDataObj.current.allFolderSearchDate[0].format("YYYY-MM-DD") :
                null,
              resolveAllFolderSearchDataObj.current != null ?
                resolveAllFolderSearchDataObj.current.allFolderSearchDate[1].format("YYYY-MM-DD") :
                null,
              new resolveSettings().resolveFolderNameById(
                props.treeViewFolderId
              ),
              new resolveSettings().resolveFolderSettings(props.treeViewFolderId).makeNoArchieveIncludeInnerFolder
            )
              .then((responseJson) => {
                if (responseJson.Data != null) {
                  var fileName = new resolveSettings().resolveFolderNameById(
                    props.treeViewFolderId
                  ) + ".xls";
                  new otherMethods().exportXls(
                    fileName,
                    responseJson.Data
                  )

                }
              })
              .catch((error) => {
                alert("Error while exporting")
              });
          } else {

            ApiCalls.getDataForExcelExportArchiveOrCurrentWithTextSearch(
              new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
                .FolderType
              ,
              props.treeViewFolderId
              ,
              new resolveSettings().resolveUserId(),
              props.searchText,
              props.searchType == SearchTypes.Current ? moment().format("YYYY-MM-DD") : archiveSearchDate.current[0].format("YYYY-MM-DD"),
              props.searchType == SearchTypes.Current ? moment().format("YYYY-MM-DD") : archiveSearchDate.current[1].format("YYYY-MM-DD"),
              new resolveSettings().resolveFolderNameById(
                props.treeViewFolderId
              )
            )
              .then((responseJson) => {
                if (responseJson.Data != null) {
                  var fileName = new resolveSettings().resolveFolderNameById(
                    props.treeViewFolderId
                  ) + ".xls";
                  new otherMethods().exportXls(
                    fileName,
                    responseJson.Data
                  )
                }
              })
              .catch((error) => {
                alert("Error while exporting")
              });

          }
          // console.log("resolveAllFolderSearchDataObj", resolveAllFolderSearchDataObj.current)
          //console.log("resolveArchiveSearchFolderDataObj", resolveArchiveSearchFolderDataObj.current)
          //console.log("resolveSearchFolderDataObj", resolveSearchFolderDataObj.current)
          //console.log("previousResolveArchiveSearchFolderDataObj", previousResolveArchiveSearchFolderDataObj)
          //console.log("pollFolderDataObj.current.data", pollFolderDataObj.current.data)
        }} />

        <Box flexGrow={1}>
          <Typography
            display={"inline"}
            className={clsx(
              { [classes.borderLeft]: props.searchType },
              classes.selectedFoldertitle
            )}
          >
            {props.searchType == SearchTypes.AllFolders
              ? "Search"
              : new resolveSettings().resolveFolderNameById(
                props.treeViewFolderId
              )}
          </Typography>
        </Box>
        {(new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
          .FolderType == FolderTypes.AllIncomingReview ||
          new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .FolderType == FolderTypes.AllIncomingEnps ||
          new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .FolderType == FolderTypes.AllIncomingTicker ||
          new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .FolderType == FolderTypes.AllIncomingReviewRSR ||
          new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .FolderType == FolderTypes.AllIncomingEnpsTicker ||
          new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .FolderType == FolderTypes.AllIncomingEnpsBureauPitch ||
          (new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
            .innerFolders &&
            new resolveSettings().resolveFolderSettings(props.treeViewFolderId)
              .innerFolders.length > 0)) && (
            <Tooltip
              title={
                props.treeViewToggleGroupView
                  ? "Show without groups"
                  : "Show with groups"
              }
            >
              <IconButton
                className={classes.toggleGroupViewIconButton}
                onClick={() => {
                  props.setTreeViewToggleGroupView(
                    !props.treeViewToggleGroupView
                  );
                  props.setTreeViewData(props.treeViewDataClone);
                }}
              >
                {props.treeViewToggleGroupView ? (
                  <FormatListBulletedIcon
                    className={classes.toggleGroupViewIconButtonIcon}
                  />
                ) : (
                  <MenuOpenIcon />
                )}
              </IconButton>
            </Tooltip>
          )}
      </Container>
      {SuperTreeViewVar}
    </div>
  );

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Header ref={navRef} />
      <Container
        maxWidth={false}
        disableGutters={true}
        style={{ marginTop: props.userPanelNavbarHeight }}
        className={classes.mainContainer}
      >
        {isScreenSmall || isScreenExtraSmall ? (
          <>
            {FolderItemContainer}
            <EditorViewerModal
              showSelectionToggleButton={true}
              onSelectionNext={onSelectionNext}
              onSelectionBack={onSelectionBack}
            ></EditorViewerModal>
          </>
        ) : (
          <SplitterLayout
            ref={splitterLayoutRef}
            percentage={true}
            secondaryInitialSize={75}
            layoutHeight={
              props.userPanelWindowSize.height - props.userPanelNavbarHeight
            }
          >
            {FolderItemContainer}
            <div>
              <CRUDNavBar></CRUDNavBar>
              <EditerViewer
                showSelectionToggleButton={false}
                onSelectionNext={null}
                onSelectionBack={null}
              />
            </div>
          </SplitterLayout>
        )}
      </Container>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.TreeViewReducer,
    ...state.CRUDReducer,
    ...state.SwitchAccountModalReducer,
  };
};
export default connect(mapStateToProps, {
  setUserPanelNavbarHeight,
  setuserPanelWindowSize,
  setUserPanelTitleContainerHeight,
  setTreeViewData,
  setTreeViewLoading,
  resetSearch,
  setTreeViewSelectedItemInfo,
  setTreeViewToggleGroupView,
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
})(UserPanel);
