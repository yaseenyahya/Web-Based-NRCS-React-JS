import React from "react";
import PowerIcon from "@material-ui/icons/Power";
import { resolveSettings } from "../../auth/resolveSettings";
import { TreeviewType } from "../react-treeview/TreeviewType";
import { FolderTypes } from "../../auth/FolderTypes";
import _ from "lodash";
export default class includes {
  resolveSettingsObj = new resolveSettings();
  multiSearchOr(text, searchWords) {
    var haveWord = false;
    searchWords.forEach((word) => {
      if (text.toLowerCase().indexOf(word.toLowerCase()) != -1) {
        haveWord = true;
        return;
      }
    });
    return haveWord;
  }
  splitMulti(str, tokens) {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
      str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);

    var cleanArray = str.filter(function () {
      return true;
    });
    return cleanArray;
  }
  checkForNewEntriesAndPlaySound(currentData, previousData, isFirstCall) {
    let currentDataChildrenCombine = [].concat(
      ...currentData.map((obj) => {
        if (obj.type == TreeviewType.Parent) return obj.children;
        else return obj;
      })
    );
    currentDataChildrenCombine = _.compact(currentDataChildrenCombine);

    let previousDataChildrenCombine = [].concat(
      ...previousData.map((obj) => {
        if (obj.type == TreeviewType.Parent) return obj.children;
        else return obj;
      })
    );
    previousDataChildrenCombine = _.compact(previousDataChildrenCombine);

    let haveNewEntries = false;
    currentDataChildrenCombine.map((node) => {
      let isNew =
        _.find(previousDataChildrenCombine, (ele) => ele.id == node.id) ==
        undefined;
      if (isNew && !isFirstCall) {
        node.isHighlight = true;
        haveNewEntries = true;
      }
    });
    if (haveNewEntries) {
      var context = new AudioContext();
      context.resume().then(() => {
        this.audio = new Audio(process.env.PUBLIC_URL + "/beep.mp3");
        this.audio.load();
        this.audio.play().catch((rejectReason) => {
          //alert(rejectReason);
        });
      });
    }
  }

  diffAddTreeViewData(currentData, previousData, notChangeKeys) {
    previousData.map((item) => {
      Object.keys(item).map((key) => {
        if (!notChangeKeys.includes(key)) {
          let findCurrentItem = _.find(currentData, (ele) => ele.id == item.id);

          if (findCurrentItem != undefined) {
            if (
              findCurrentItem[key] &&
              typeof findCurrentItem[key] === "object" &&
              findCurrentItem[key].constructor === Array
            ) {
              this.diffAddTreeViewData(
                findCurrentItem[key],
                item[key],
                notChangeKeys
              );
              //diffAddTreeViewData(currentData, previousData, notChangeKeys)
            } else {
              findCurrentItem[key] = item[key];
            }
          }
        }
      });
    });
  }
  getChildrensForRundown(data) {
    let treeViewData = [];
    data.map((item) => {
      var subject =
        item.name +
        "-" +
        item.creationtime +
        " (From " +
        item.startdate +
        " " +
        item.starttime +
        " To " +
        item.enddate +
        " " +
        item.endtime;

      treeViewData.push({
        name: subject,
        id: item.id,
        type: TreeviewType.Child,
        icon: item.mosactiveid != "" && item.mosactiveid != "0" ? "power" : null,
      });
    });
    return treeViewData;
  }
  getMixedDataWithoutParent(data,parents) {
    var rundownId = (new resolveSettings()).rundownId;
    data.map((item) => {
     if(item.mainfolderid == rundownId){
      var subject =
      item.name +
      "-" +
      item.creationtime +
      " (From " +
      item.startdate +
      " " +
      item.starttime +
      " To " +
      item.enddate +
      " " +      item.endtime;

      parents.push({
      name: subject,
      id: item.id,
      type: TreeviewType.Child,
      icon: "rundown",
    mixedType:"Rundown"
    });
     }else{
        parents.push({
          name: item.subject,
          id: item.id,
          type: TreeviewType.Child,
          icon:  item.uploadfileserilize.replace("[]", "").length > 0 ? "attachment" : null,
          mixedType:"Report"
        });
     }
    });
  }
  getChildrensIntoParents(data, parents) {
    var itemAdded = false;
    data.map((item) => {
      let findParent = _.find(parents, (ele) => ele.id == item.innerfolderid);
     
     var allowView =  new resolveSettings().resolveAllowViewPermissionByFolderId(
        item.mainfolderid,
        item.innerfolderid
      ); 
     
      if(allowView){
      if (findParent != undefined) {
        if (findParent.children == undefined) findParent.children = [];
        findParent.children.push({
          name: item.subject,
          id: item.id,
          type: TreeviewType.Child,
          parentId: findParent.id,
          icon:  item.uploadfileserilize.replace("[]", "").length > 0 ? "attachment" : null,
        });
      } else {
        parents.push({
          name: item.subject,
          id: item.id,
          type: TreeviewType.Child,
          icon:  item.uploadfileserilize.replace("[]", "").length > 0 ? "attachment" : null,
        });
      }
      itemAdded = true;
    }
    });
    return itemAdded;
  }
  getParents(folderType, data,innerFolders,folderID) {
    if (
      folderType == FolderTypes.AllIncomingReview ||
      folderType == FolderTypes.AllIncomingEnps ||
      folderType == FolderTypes.AllIncomingTicker ||
      folderType == FolderTypes.AllIncomingReviewRSR ||
      folderType == FolderTypes.AllIncomingEnpsTicker ||
      folderType == FolderTypes.AllIncomingEnpsBureauPitch
    ) {
      var parentDataDefault = [
        {
          name: "Lahore",
          id: "Lahore",
          type: TreeviewType.Parent,
        },
        {
          name: "Islamabad",
          id: "Islamabad",
          type: TreeviewType.Parent,
        },
        {
          name: "Peshawar",
          id: "Peshawar",
          type: TreeviewType.Parent,
        },
        {
          name: "Quetta",
          id: "Quetta",
          type: TreeviewType.Parent,
        },
        {
          name: "Sindh",
          id: "Sindh",
          type: TreeviewType.Parent,
        },
        {
          name: "Karachi",
          id: "Karachi",
          type: TreeviewType.Parent,
        },
      ];
      parentDataDefault = this.findParentNotAdded(
        parentDataDefault,
        data,
        "",
        false,
        folderID
      );
      return parentDataDefault;
    } else {
    
      let parentDataDefault = [];
      innerFolders &&
     innerFolders.map((item) => {
    
      
      var allowView =  new resolveSettings().resolveAllowViewPermissionByFolderId(
        folderID,
        item.FolderID
      ); 
    
      if(allowView){
          let name = item.FolderID;
          let findParentName = this.resolveSettingsObj.resolveInnerFolderInfo(
           folderID,
            item.FolderID
          );
          if (findParentName != undefined) name = findParentName.folderName;
          parentDataDefault.push({
            name: name,
            id: item.FolderID,
            type: TreeviewType.Parent,
          });
        }
        });

      parentDataDefault = this.findParentNotAdded(
        parentDataDefault,
        data,
        "",
        true,
        folderID
      );

      return parentDataDefault;
    }
  }
  findParentNotAdded(
    previousParentData,
    data,
    idDelimeter,
    findInnerFolderInfo,
    folderID //if its other folder it find for foldername
  ) {
    data.map((item) => {
      if (item.innerfolderid != "") {
        var findParentInDefaultParent = _.find(
          previousParentData,
          (ele) => ele.id == idDelimeter + item.innerfolderid
        );

        if (findParentInDefaultParent == undefined) {

          var allowView =  new resolveSettings().resolveAllowViewPermissionByFolderId(
            folderID,
            item.innerfolderid
          ); 
          
          if(allowView){

          let name = item.innerfolderid;

          if (findInnerFolderInfo) {
            let findParentName = this.resolveSettingsObj.resolveInnerFolderInfo(
              folderID,
              item.innerfolderid
            );
            if (findParentName != undefined) name = findParentName.folderName;
          }
          previousParentData.push({
            name: name,
            id: idDelimeter + item.innerfolderid,
            type: TreeviewType.Parent,
          });
        }
      }
      }
    });
    return previousParentData;
  }
}
