import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import { FolderTypes } from "../../auth/FolderTypes";
import includes from "./includes";
import _ from "lodash";
export default class resolveSearchFolderData {
  folderID = null;
  folderType = null;
  makeNoArchieveIncludeInnerFolder = false;
  userId = null;
  innerFolders = null;
  forceStop = false;

  setTreeViewData = null;
  setTreeViewLoading = null;

  resolveSettingsObj = null;

  dataFromCurrentPollFolderData = null;
  constructor(
    folderID,
    searchText,
    setTreeViewData,
    setTreeViewLoading,
    dataFromCurrentPollFolderData
  ) {
    this.dataFromCurrentPollFolderData = dataFromCurrentPollFolderData;
    this.resolveSettingsObj = new resolveSettings();
    this.folderID = folderID;
    this.setTreeViewData = setTreeViewData;
    this.setTreeViewLoading = setTreeViewLoading;

    let folderSettings = this.resolveSettingsObj.resolveFolderSettings(
      folderID
    );
    this.userId = this.resolveSettingsObj.resolveUserId();
    if (folderSettings) {
      this.innerFolders = folderSettings.innerFolders;
      this.folderType = folderSettings.FolderType;
      this.makeNoArchieveIncludeInnerFolder =
        folderSettings.makeNoArchieveIncludeInnerFolder;
    }

    if (this.folderType == FolderTypes.Rundowns) {
      this.searchTodayTextRundown(
        searchText,
        this.userId,
        this.afterRundownTextSearchCallback
      );
    } else {
      this.bindFolderData(searchText);
    }
  }

  bindFolderData = async (searchText) => {
    if (!this.forceStop) {
      var data = await this.dataFromCurrentPollFolderData(this.folderID);
      if (!this.forceStop) {
        data = data == null ? [] : data;

        var includesObj = new includes();

        var searchTextarray = includesObj.splitMulti(searchText, [",", "،"]);

        var filteredItems = data.filter(function (item) {
          return (
            includesObj.multiSearchOr(item.slugtext, searchTextarray) ||
            includesObj.multiSearchOr(item.subject, searchTextarray)
          );
        });

        data = filteredItems;

        let treeViewData = includesObj.getParents(
          this.folderType,
          data,
          this.innerFolders,
          this.folderID
        );

        includesObj.getChildrensIntoParents(data, treeViewData);
        this.setTreeViewData(_.cloneDeep(treeViewData));
        this.setTreeViewLoading(false);
      }
    }
  };
  afterRundownTextSearchCallback = (data) => {
    if (!this.forceStop) {
      var includesObj = new includes();
      let treeViewData = includesObj.getChildrensForRundown(data);
      this.setTreeViewData(_.cloneDeep(treeViewData));
      this.setTreeViewLoading(false);
    }
  };
  stop() {
    this.forceStop = true;
  }
  searchTodayTextRundown = (
    searchText,
    userId,
    afterRundownTextSearchCallback
  ) => {
    ApiCalls.getTodaySearchRundownData(searchText, userId)
      .then((responseJson) => {
        if (responseJson.Data != null) {
          afterRundownTextSearchCallback(responseJson.Data);
        }
      })
      .catch((error) => {
        alert(this.forceStop);
        console.log(error);
        this.searchTodayTextRundown(
          searchText,
          userId,
          afterRundownTextSearchCallback
        );
      });
  };
}
