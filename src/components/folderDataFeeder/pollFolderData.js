import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import { FolderTypes } from "../../auth/FolderTypes";
import _ from "lodash";
import includes from "./includes";
export default class pollFolderData {
  folderID = null;
  folderType = null;
  makeNoArchieveIncludeInnerFolder = false;
  UserId = null;
  innerFolders = null;
  fetchOnProcess = false;
  forceStop = false;

  data = null;

  setTreeViewData = null;
  setTreeViewLoading = null;
  getPreviousTreeViewData = null;

  resolveSettingsObj = null;

  isFirstCall = true;

  isFirstDataFetch = true;
  constructor(
    folderID,
    setTreeViewData,
    getPreviousTreeViewData,
    setTreeViewLoading
  ) {
    this.resolveSettingsObj = new resolveSettings();
    this.folderID = folderID;
    this.setTreeViewData = setTreeViewData;
    this.setTreeViewLoading = setTreeViewLoading;

    this.getPreviousTreeViewData = getPreviousTreeViewData;

    let folderSettings = this.resolveSettingsObj.resolveFolderSettings(
      folderID
    );
    this.UserId = this.resolveSettingsObj.resolveUserId();
    if (folderSettings) {
      this.innerFolders = folderSettings.innerFolders;
      this.folderType = folderSettings.FolderType;
      this.makeNoArchieveIncludeInnerFolder =
        folderSettings.makeNoArchieveIncludeInnerFolder;

      this.start();
    }
  }
  intervalTimer = null;
  start() {
    this.getData();
    this.intervalTimer = setInterval(() => {
      this.getData();
    }, 22000); //22000
  }
  stop() {
    clearInterval(this.intervalTimer);
    this.forceStop = true;
  }
  pause() {
    this.forceStop = true;
  }
  async getData() {
    var includesObj = new includes();
    if (!this.fetchOnProcess) {
      this.fetchOnProcess = true;
      if (this.folderType == FolderTypes.Rundowns) {
        await ApiCalls.getRundownData(this.UserId)
          .then((responseJson) => {
            //  console.log(responseJson);
            if (responseJson.Data != null) {
              this.data = responseJson.Data;
              this.isFirstDataFetch = false;
              if (!this.forceStop) {
                var treeViewData = includesObj.getChildrensForRundown(
                  this.data
                );
                includesObj.checkForNewEntriesAndPlaySound(
                  treeViewData,
                  this.getPreviousTreeViewData(),
                  this.isFirstCall
                );
                includesObj.diffAddTreeViewData(
                  treeViewData,
                  this.getPreviousTreeViewData(),
                  ["id", "name"]
                );

                this.setTreeViewData(_.cloneDeep(treeViewData));
                this.setTreeViewLoading(false);

                this.isFirstCall = false;
              }
            }
            this.fetchOnProcess = false;
          })
          .catch((error) => {
            console.log(error);
            this.fetchOnProcess = false;
          });
      } else {
        await ApiCalls.getTodayReportsData(
          this.folderID,
          this.folderType,
          this.UserId,
          this.makeNoArchieveIncludeInnerFolder
        )
          .then((responseJson) => {
            //  console.log(responseJson);
            if (responseJson.Data != null) {
              this.data = responseJson.Data;
              this.isFirstDataFetch = false;
              console.log(responseJson.Data)
              if (!this.forceStop) {
                let treeViewData = includesObj.getParents(
                  this.folderType,
                  this.data,
                  this.innerFolders,
                  this.folderID
                );
               var itemAdded = includesObj.getChildrensIntoParents(this.data, treeViewData);
               if(itemAdded){
               includesObj.checkForNewEntriesAndPlaySound(
                  treeViewData,
                  this.getPreviousTreeViewData(),
                  this.isFirstCall
                );
               }
                includesObj.diffAddTreeViewData(
                  treeViewData,
                  this.getPreviousTreeViewData(),
                  ["id", "name"]
                );

                this.setTreeViewData(_.cloneDeep(treeViewData));
                this.setTreeViewLoading(false);

                this.isFirstCall = false;
              }
            }
            this.fetchOnProcess = false;
          })
          .catch((error) => {
            console.log(error);
            this.fetchOnProcess = false;
          });
      }
    }
  }
}
