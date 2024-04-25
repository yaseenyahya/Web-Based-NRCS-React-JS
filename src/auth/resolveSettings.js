import { auth } from "./auth";
import { FolderTypes } from "./FolderTypes";
import _ from "lodash";
export class resolveSettings {
  constructor() {}
  rundownId = "Rundown";
  resolveShowRundown(){
    let settings = JSON.parse(auth.getAuthSettings());
  
   return settings.advancesettings.RundownSettings.ShowRundown;
  }
  resolveDesignation() {
    let settings = JSON.parse(auth.getAuthSettings());
    
    return settings.designation;
  }
  resolveUsername() {
    let settings = JSON.parse(auth.getAuthSettings());

    return settings.username;
  }
  resolvePassword() {
    let settings = JSON.parse(auth.getAuthSettings());

    return settings.password;
  }
  resolveFolderName() {
    let settings = JSON.parse(auth.getAuthSettings());

    return settings.fname;
  }
  resolveName() {
    let settings = JSON.parse(auth.getAuthSettings());

    return settings.name;
  }
  resolveRundownOtherSettings() {
    let settings = JSON.parse(auth.getAuthSettings());
    return settings.advancesettings.RundownOtherSettings;
  }
  resolveUserId() {
    let settings = JSON.parse(auth.getAuthSettings());
    return settings.id;
  }
  resolveAxonAppFileWatchDownloadFolderSource() {
    let settings = JSON.parse(auth.getAuthSettings());
    return settings.advancesettings.AxonAppFileWatchDownloadFolderSource;
  }
  resolveVORecordingSavePath() {
    let settings = JSON.parse(auth.getAuthSettings());
    return settings.advancesettings.VORecordingSavePath;
  }
resolveFileUploadFolderSource(){
  let settings = JSON.parse(auth.getAuthSettings());
  return settings.advancesettings.FileUploadFolderSource;
}
resolveUserEditPermission(){
  let settings = JSON.parse(auth.getAuthSettings());
 
  return settings.advancesettings.AllowWebEdit;
}
resolveUserDeletePermission(){
  let settings = JSON.parse(auth.getAuthSettings());

  return settings.advancesettings.AllowWebDelete;
}
resolveUserAddPermission(){
  let settings = JSON.parse(auth.getAuthSettings());
 
  return settings.advancesettings.AllowWebAdd;
}
  resolveFolderSettings(folderId) {
    if (folderId == this.rundownId) {
      return {
        id: this.rundownId,
        FolderType: FolderTypes.Rundowns,
        TempFolderName: "Rundowns",
      };
    } else {
      let settings = JSON.parse(auth.getAuthSettings());
      
      var folderSettings = _.find(
        settings.advancesettings.MainFoldersSettings,
        function (folder) {
          return folder.FolderID == folderId;
        }
      );
      return folderSettings;
    }
  }
  resolveAllowAddPermissionByFolderId(mainFolderId) {
    let allowAdd = false;
    const mainFolderSettings = new resolveSettings().resolveFolderSettings(
      mainFolderId
    );
    if (mainFolderSettings.FolderType == FolderTypes.UserFolder)
      allowAdd = true;
    else allowAdd = mainFolderSettings.allowAddNewItem;
    return allowAdd;
  }
  resolveAllowEditPermissionByFolderId(folderId, subFolderId) {
    let allowEdit = false;
    if (folderId != this.rundownId) {
      let mainFolderSettings = this.resolveFolderSettings(folderId);
      if (subFolderId != "") {
        let innerFolderSettings = _.find(
          mainFolderSettings.innerFolders,
          (element) => element.FolderID == subFolderId
        );

        if (innerFolderSettings != undefined)
          allowEdit = innerFolderSettings.allowEdit;
      } else
        allowEdit =
          mainFolderSettings.FolderType == FolderTypes.UserFolder
            ? true
            : mainFolderSettings.allowEdit;
    }
    return allowEdit;
  }
  resolveAllowViewPermissionByFolderId(folderId,  subFolderId) {
    let allowView = false;
    if (folderId != this.rundownId) {
      let mainFolderSettings = this.resolveFolderSettings(folderId);
    if(mainFolderSettings.FolderType == FolderTypes.ReutersFolder){
      mainFolderSettings.allowView = true;
    }
      if (
        mainFolderSettings.FolderType == FolderTypes.AllIncomingReview ||
        mainFolderSettings.FolderType == FolderTypes.AllIncomingEnps ||
        mainFolderSettings.FolderType == FolderTypes.AllIncomingTicker ||
        mainFolderSettings.FolderType == FolderTypes.AllIncomingReviewRSR ||
        mainFolderSettings.FolderType == FolderTypes.AllIncomingEnpsTicker ||
        mainFolderSettings.FolderType == FolderTypes.AllIncomingEnpsBureauPitch ||
        mainFolderSettings.FolderType == FolderTypes.ReutersFolder
      ) {
  
        allowView = true;
      }else{
       
      if (mainFolderSettings != undefined)  {
        if( mainFolderSettings.FolderType != FolderTypes.UserFolder){
        if(subFolderId == ""){
          
          allowView = mainFolderSettings.allowView;
        }else{
        let innerFolderSettings = _.find(
          mainFolderSettings.innerFolders,
          (element) => element.FolderID == subFolderId
        );
      
        if (innerFolderSettings != undefined)
        allowView = true;
        }
      }else
      allowView =
          mainFolderSettings.FolderType == FolderTypes.UserFolder
            ? true
            : mainFolderSettings.allowView;
    }
    }
    }

     
    return allowView;
  }
  resolveAllowDeletePermissionByFolderId(folderId, subFolderId) {
    let allowDelete = false;
    if (folderId != this.rundownId) {
      let mainFolderSettings = this.resolveFolderSettings(folderId);
      if (subFolderId != "") {
        let innerFolderSettings = _.find(
          mainFolderSettings.innerFolders,
          (element) => element.FolderID == subFolderId
        );

        if (innerFolderSettings != undefined)
          allowDelete = innerFolderSettings.allowDelete;
      } else
        allowDelete =
          mainFolderSettings.FolderType == FolderTypes.UserFolder
            ? true
            : mainFolderSettings.allowDelete;
    }
    return allowDelete;
  }
  resolveAllowAddPermissionByFolderId(folderId) {
    let allowAdd = false;
    if (folderId != this.rundownId) {
      let mainFolderSettings = this.resolveFolderSettings(folderId);
      if (mainFolderSettings.FolderType == FolderTypes.UserFolder) {
        allowAdd = true;
      } else {
        if (mainFolderSettings.innerFolders > 0) {
          let innerFolderSettingsAllowAdd = _.find(
            mainFolderSettings.innerFolders,
            (element) => element.allowAddNewItem
          );

          if (innerFolderSettingsAllowAdd != undefined) allowAdd = true;
        } else allowAdd = mainFolderSettings.allowAddNewItem;
      }
    }
    return allowAdd;
  }
  resolveRundownId() {
    return this.rundownId;
  }
  resolveFolderNameById(folderId) {
    let folderSettings = this.resolveFolderSettings(folderId);
    var folderName = "";
    if (folderSettings) {
      let settings = JSON.parse(auth.getAuthSettings());
      if (folderSettings.FolderType == FolderTypes.UserFolder) {
        folderName =
          settings.foldername == "" ? "UserFolder" : settings.foldername;
      } else if (folderSettings.FolderType == FolderTypes.Other) {
        var folderNameFind = settings.advancesettings.MainFolderInfo.find(
          (element) => element.id == folderId
        );

        if (folderNameFind != null) folderName = folderNameFind.folderName;
      } else {
        folderName = folderSettings.TempFolderName;
      }
    }
    return folderName;
  }
  resolveInnerFolderInfo(parentFolderId, innerFolderId) {
    let settings = JSON.parse(auth.getAuthSettings());
    var folderInfo = _.find(settings.advancesettings.InnerFolderInfo, function (
      folder
    ) {
      return (
        folder.bottomFolderId == parentFolderId && folder.id == innerFolderId
      );
    });

    return folderInfo;
  }
  resolveStartupFolderId() {
    var startupFolderId = auth.getStartupFolderId();
    if (startupFolderId == this.rundownId) {
      return this.rundownId;
    } else {
      let settings = JSON.parse(auth.getAuthSettings());
      if (!startupFolderId || startupFolderId == null) {
        if (settings)
          startupFolderId =
            settings.advancesettings.MainFoldersSettings[0].FolderID;
      }
      return startupFolderId;
    }
  }
  resolveFolderListWithInnerFoldersWithAllowAddPermission() {
    let settings = JSON.parse(auth.getAuthSettings());
    var folderList = [];
    settings.advancesettings.MainFoldersSettings.map(
      (MainFoldersSettings, key) => {
        if (
          MainFoldersSettings.FolderType != FolderTypes.AllIncomingReview &&
          MainFoldersSettings.FolderType != FolderTypes.AllIncomingEnps &&
          MainFoldersSettings.FolderType != FolderTypes.AllIncomingTicker &&
          MainFoldersSettings.FolderType != FolderTypes.AllIncomingReviewRSR &&
          MainFoldersSettings.FolderType != FolderTypes.AllIncomingEnpsTicker &&
          MainFoldersSettings.FolderType !=
            FolderTypes.AllIncomingEnpsBureauPitch
        ) {
          var folderName = null;
          var folderId = MainFoldersSettings.FolderID;
          if (MainFoldersSettings.FolderType == FolderTypes.UserFolder) {
            folderName =
              settings.foldername == "" ? "UserFolder" : settings.foldername;
          } else if (MainFoldersSettings.FolderType == FolderTypes.Other) {
            var folderNameFind = settings.advancesettings.MainFolderInfo.find(
              (element) => element.id == MainFoldersSettings.FolderID
            );

            if (folderNameFind != null) folderName = folderNameFind.folderName;
          } else {
            folderName = MainFoldersSettings.TempFolderName;
          }

          if (folderName == null) folderName = "No-Name";

          var folderListMaker = {
            text: folderName,
            id: folderId,
            allowAdd:
              MainFoldersSettings.FolderType == FolderTypes.UserFolder
                ? true
                : MainFoldersSettings.allowAddNewItem,
            innerFolders: [],
          };
          if (MainFoldersSettings.innerFolders.length > 0) {
            MainFoldersSettings.innerFolders.map((innerFolderSettings, key) => {
              let innerFolderName = innerFolderSettings.FolderID;

              let findInnerFolderName = this.resolveInnerFolderInfo(
                folderId,
                innerFolderSettings.FolderID
              );
              if (findInnerFolderName != undefined)
                innerFolderName = findInnerFolderName.folderName;

              folderListMaker.innerFolders.push({
                text: innerFolderName,
                id: innerFolderSettings.FolderID,
                mainFolderId: folderId,
                allowAdd: innerFolderSettings.allowAddNewItem,
              });
            });
          }
          folderList.push(folderListMaker);
        }
      }
    );
    return folderList;
  }
  resolveInnerFoldersWithAllowAddPermission(mainFolderId) {
    var folderList = [];
    const mainFolderSettings = this.resolveFolderSettings(mainFolderId);

    if (mainFolderSettings.innerFolders.length > 0) {
      mainFolderSettings.innerFolders.map((innerFolderSettings, key) => {
        let innerFolderName = innerFolderSettings.FolderID;

        let innerItem = this.resolveInnerFolderInfo(
          mainFolderId,
          innerFolderSettings.FolderID
        );
      

          if (innerItem != undefined && innerFolderSettings.allowAddNewItem) {

          innerFolderName = innerItem.folderName;
        folderList.push({
          text: innerFolderName,
          id: innerFolderSettings.FolderID,
          mainFolderId: mainFolderId,
          allowAdd: innerFolderSettings.allowAddNewItem,
        });
      }
      });
    }
    return folderList;
  }
  resolveMainFolderIds() {
    let settings = JSON.parse(auth.getAuthSettings());
    var mainFolderList = [];
    settings.advancesettings.MainFoldersSettings.map(
      (MainFoldersSettings, key) => {
     
        var folderId = MainFoldersSettings.FolderID;
      

        mainFolderList.push(folderId);
      }
    );
    
    return mainFolderList.join(",");
  }
  resolveMainFolderIdsWithCommas() {
    let settings = JSON.parse(auth.getAuthSettings());
    var mainFolderList = [];
    settings.advancesettings.MainFoldersSettings.map(
      (MainFoldersSettings, key) => {
     
        var folderId = "'" + MainFoldersSettings.FolderID + "'";
      

        mainFolderList.push(folderId);
      }
    );
    
    return mainFolderList.join(",");
  }
  resolveFolderList() {
    let settings = JSON.parse(auth.getAuthSettings());
    var folderList = [];
    settings.advancesettings.MainFoldersSettings.map(
      (MainFoldersSettings, key) => {
        var folderName = null;
        var folderId = MainFoldersSettings.FolderID;
        if (MainFoldersSettings.FolderType == FolderTypes.UserFolder) {
          folderName =
            settings.foldername == "" ? "UserFolder" : settings.foldername;
        } else if (MainFoldersSettings.FolderType == FolderTypes.Other) {
          var folderNameFind = settings.advancesettings.MainFolderInfo.find(
            (element) => element.id == MainFoldersSettings.FolderID
          );

          if (folderNameFind != null) folderName = folderNameFind.folderName;
        } else {
          folderName = MainFoldersSettings.TempFolderName;
        }

        if (folderName == null) folderName = "No-Name";

        folderList.push({ text: folderName, id: folderId });
      }
    );
    return folderList;
  }
}
