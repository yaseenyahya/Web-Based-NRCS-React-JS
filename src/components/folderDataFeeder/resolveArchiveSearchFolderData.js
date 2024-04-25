import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import { FolderTypes } from "../../auth/FolderTypes";
import includes from "./includes";
import _ from "lodash";
export default class resolveArchiveSearchFolderData {
  folderID = null;
  folderType = null;
  makeNoArchieveIncludeInnerFolder = false;
  userId = null;
  innerFolders = null;
  forceStop = false;

  setTreeViewData = null;
  setTreeViewLoading = null;

  resolveSettingsObj = null;

  dataFromResolveSearchFolderData = null;

  archiveData = null;

  isDataFetch = false;

  constructor(
    folderID,
    archiveSearchDate,
    searchText,
    setTreeViewData,
    setTreeViewLoading,
    dataFromResolveSearchFolderData
  ) {
    this.dataFromResolveSearchFolderData = dataFromResolveSearchFolderData;
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
      if (searchText == "") {
        this.getRundownArchiveData(
          this.userId,
          archiveSearchDate,
          this.afterRundownArchiveSearchCallback
        );
      } else {
        this.getRundownSearchTextArchiveData(
          this.userId,
          searchText,
          archiveSearchDate,
          this.afterRundownArchiveSearchCallback
        );
      }
    } else {
      if (searchText != "") {
        this.bindFolderData(searchText, archiveSearchDate);
      } else {
        this.getArchiveReports(
          this.folderID,
          this.folderType,
          this.userId,
          this.makeNoArchieveIncludeInnerFolder,
          archiveSearchDate
        );
      }
    }
  }
  afterArchiveReportsCallback = (data) => {
    this.archiveData = data;
    this.isDataFetch = true;
    if (!this.forceStop) {
      var includesObj = new includes();
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
  };
  getArchiveReports = (
    folderId,
    folderType,
    userId,
    makeNoArchieveIncludeInnerFolder,
    archiveSearchDate
  ) => {
    ApiCalls.getArchiveReportsData(
      folderId,
      folderType,
      userId,
      makeNoArchieveIncludeInnerFolder,
      archiveSearchDate[0].format("YYYY-MM-DD"),
      archiveSearchDate[1].format("YYYY-MM-DD")
    )
      .then((responseJson) => {
        if (responseJson.Data != null) {
          this.afterArchiveReportsCallback(responseJson.Data);
        }
      })
      .catch((error) => {
        this.getArchiveReports(
          folderId,
          folderType,
          userId,
          makeNoArchieveIncludeInnerFolder,
          archiveSearchDate
        );
      });
  };
  bindFolderData = async (searchText, archiveSearchDate) => {
    if (!this.forceStop) {
      // because on first call previousresolveArchiveSearchFolderDataObj is null

      this.archiveData = await this.dataFromResolveSearchFolderData(
        this.folderID,
        archiveSearchDate
      );
      this.isDataFetch = true;
      var data = this.archiveData;
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
  afterRundownArchiveSearchCallback = (data) => {
    this.isDataFetch = true;
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
  getRundownArchiveData = (
    userId,
    archiveSearchDate,
    afterRundownArchiveSearchCallback
  ) => {
    ApiCalls.getRundownArchiveData(
      userId,
      archiveSearchDate[0].format("YYYY-MM-DD"),
      archiveSearchDate[1].format("YYYY-MM-DD")
    )
      .then((responseJson) => {
        if (responseJson.Data != null) {
          afterRundownArchiveSearchCallback(responseJson.Data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.getRundownArchiveData(
          userId,
          archiveSearchDate,
          afterRundownArchiveSearchCallback
        );
      });
  };

  getRundownSearchTextArchiveData = (
    userId,
    searchText,
    archiveSearchDate,
    afterRundownArchiveSearchCallback
  ) => {
    ApiCalls.getRundownSearchArchiveData(
      searchText,
      userId,
      archiveSearchDate[0].format("YYYY-MM-DD"),
      archiveSearchDate[1].format("YYYY-MM-DD")
    )
      .then((responseJson) => {
        if (responseJson.Data != null) {
          afterRundownArchiveSearchCallback(responseJson.Data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.getRundownSearchTextArchiveData(
          userId,
          searchText,
          archiveSearchDate,
          afterRundownArchiveSearchCallback
        );
      });
  };
}
