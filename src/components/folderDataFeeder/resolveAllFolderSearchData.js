import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import { FolderTypes } from "../../auth/FolderTypes";
import includes from "./includes";
import _ from "lodash";
export default class resolveAllFolderSearchData {
  folderID = null;
  folderType = null;
  userId = null;

  forceStop = false;

  setTreeViewData = null;
  setTreeViewLoading = null;

  resolveSettingsObj = null;
  allFolderSearchDate = null;
  allFolderSearchText = null;
  allFolderData = null;

  isDataFetch = false;

  constructor(
    folderID,
    allFolderSearchDate,
    allFolderSearchText,
    setTreeViewData,
    setTreeViewLoading,

  ) {
   
    this.resolveSettingsObj = new resolveSettings();
    this.folderID = folderID;
    this.setTreeViewData = setTreeViewData;
    this.setTreeViewLoading = setTreeViewLoading;

    this.userId = this.resolveSettingsObj.resolveUserId();
   var mainFolderIds = this.resolveSettingsObj.resolveMainFolderIds();
    this.getAdvanceSearchReportsRundown(
      this.userId,
      mainFolderIds,
      allFolderSearchText,
      allFolderSearchDate,
      this.advanceSearchReportsRundownCallback
    );
  }
  advanceSearchReportsRundownCallback = (data) => {
    this.allFolderData = data;
    this.isDataFetch = true;
  
    if (!this.forceStop) {
      var includesObj = new includes();
      let treeViewData = [];
      includesObj.getMixedDataWithoutParent(data,treeViewData);
      this.setTreeViewData(_.cloneDeep(treeViewData));
      this.setTreeViewLoading(false);
    }
  };

  stop() {
   
    this.forceStop = true;
  }

  getAdvanceSearchReportsRundown = (
    userId,
    mainFolderIds,
    allFolderSearchText,
    allFolderSearchDate,
    advanceSearchReportsRundownCallback
  ) => {

    this.allFolderSearchDate = allFolderSearchDate;
    this.allFolderSearchText = allFolderSearchText;
    ApiCalls.getAdvanceSearchReportsRundown(
      allFolderSearchText,
      mainFolderIds,
      userId,
      allFolderSearchDate[0].format("YYYY-MM-DD"),
      allFolderSearchDate[1].format("YYYY-MM-DD")
    )
      .then((responseJson) => {
        if (responseJson.Data != null) {

          advanceSearchReportsRundownCallback(responseJson.Data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.getAdvanceSearchReportsRundown(
          userId,
          mainFolderIds,
          allFolderSearchText,
          allFolderSearchDate,
          advanceSearchReportsRundownCallback
        );
      });
  };
}
