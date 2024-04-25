import conf from "../conf.json";
import Rijndael from "rijndael-js";
export default {
  APILinkFromFile: null,
  APIAjjEpesLinkFromFile: null,
  EncryptionKey: "UkXp2s5u8x/A?D(G+KbPeShVmYq3t6w9",
  API: async function () {
    if (!this.APILinkFromFile) {
      await fetch(process.env.PUBLIC_URL + "/conf.txt")
        .then((response) => response.json())
        .then((res) => {
          this.APILinkFromFile = res.AXONSERVICE;

          const cipher = new Rijndael(this.EncryptionKey, "ecb", null);

          var resultArray = Buffer.from(
            cipher.decrypt(Buffer.from(this.APILinkFromFile, "base64"), 128)
          );

          var result = "";
          for (var i = 0; i < resultArray.length && resultArray[i] != 0 && resultArray[i] != 13 && resultArray[i] != 14 && resultArray[i] != 8 && resultArray[i] != 12 && resultArray[i] != 6 && resultArray[i] != 7 && resultArray[i] != 9 && resultArray[i] != 15 && resultArray[i] != 3 && resultArray[i] != 10 &&  resultArray[i] != 11; i++) {
            result += String.fromCharCode(resultArray[i]);
          }
       this.APILinkFromFile = result;
         // this.APILinkFromFile = "http://localhost:8082/";
        })
        .catch((error) => {
          alert(error);
        });
    }
    return this.APILinkFromFile;
  },
  APIAjjEpes: async function () {
    if (!this.APIAjjEpesLinkFromFile) {
      await fetch(process.env.PUBLIC_URL + "/conf.txt")
        .then((response) => response.json())
        .then((res) => {
          this.APIAjjEpesLinkFromFile = res.AAJEPES;
          const cipher = new Rijndael(this.EncryptionKey, "ecb", null);

          var resultArray = Buffer.from(
            cipher.decrypt(Buffer.from(this.APIAjjEpesLinkFromFile, "base64"), 128)
          );

          var result = "";
          for (var i = 0; i < resultArray.length && resultArray[i] != 0 && resultArray[i] != 13 && resultArray[i] != 14 && resultArray[i] != 8 && resultArray[i] != 12 && resultArray[i] != 6 && resultArray[i] != 7 && resultArray[i] != 9 && resultArray[i] != 15 && resultArray[i] != 3 && resultArray[i] != 10 &&  resultArray[i] != 11; i++) {
            result += String.fromCharCode(resultArray[i]);
          }
          this.APIAjjEpesLinkFromFile = result;
          //alert(CryptoJS.AES.encrypt("my message", "secret key 123").toString());
        })
        .catch((error) => {
          alert(error);
        });
    }
    return this.APIAjjEpesLinkFromFile;
  },

  callLoginApi: async function (username, password,showConsole) {
    return fetch((await this.API()) + `loginwebreconnect?username=${username}&password=${password}&showConsole=${showConsole}`, {
      method: "GET",
    }).then((response) => response.json());
  },
  callLoginWebApi: async function (username, password) {
    return fetch((await this.API()) + `loginweb/${username}/${password}`, {
      method: "GET",
    }).then((response) => response.json());
  },
  getUploadID: async function () {
    return fetch((await this.APIAjjEpes()) + `getUploadID`, {
      method: "GET",
    });
  },
  registerUser: async function (fullName, city, mobile, email, channelName) {
    return fetch(
      (await this.APIAjjEpes()) +
        `registerUserAxonMobile/${fullName}/${city}/${mobile}/${email}/${channelName}`,
      {
        method: "GET",
      }
    );
  },
  getTodayReportsData: async function (
    folderID,
    folderType,
    userID,
    makeNoArchieveIncludeInnerFolder
  ) {
    return fetch(
      (await this.API()) +
        `data?folderID=${folderID}&folderTypeIndex=${folderType}&userID=${userID}&makeNoArchieveIncludeInnerFolder=${makeNoArchieveIncludeInnerFolder}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getArchiveReportsData: async function (
    folderID,
    folderType,
    userID,
    makeNoArchieveIncludeInnerFolder,
    dateFrom,
    dateTo
  ) {
    return fetch(
      (await this.API()) +
        `dataarchive?folderID=${folderID}&folderTypeIndex=${folderType}&userID=${userID}&makeNoArchieveIncludeInnerFolder=${makeNoArchieveIncludeInnerFolder}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getRundownData: async function (userID) {
    return fetch((await this.API()) + `rundowndata?userID=${userID}`, {
      method: "GET",
    }).then((response) => response.json());
  },
  getTodaySearchRundownData: async function (advanceWordSearchText, userID) {
    return fetch(
      (await this.API()) +
        `searchrundowndata?advanceWordSearchText=${advanceWordSearchText}&userID=${userID}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getRundownArchiveData: async function (userID, dateFrom, dateTo) {
    return fetch(
      (await this.API()) +
        `rundownarchivedata?userID=${userID}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getRundownSearchArchiveData: async function (
    AdvanceWordSearchText,
    userID,
    dateFrom,
    dateTo
  ) {
    return fetch(
      (await this.API()) +
        `searchrundownarchivedata?advanceWordSearchText=${AdvanceWordSearchText}&userID=${userID}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getModificationWithReadDetails: async function (ID, itemType) {
    return fetch(
      (await this.API()) + `modwithreaddetails?ID=${ID}&itemType=${itemType}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getReportSopper: async function (ID, itemType) {
    return fetch(
      (await this.API()) + `reportsopper?ID=${ID}&itemType=${itemType}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  changePassword: async function (userID, currentPassword, changePassword) {
    return fetch(
      (await this.API()) +
        `changepassword?userID=${userID}&currentPassword=${currentPassword}&changePassword=${changePassword}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  haveSopper: async function (ID, itemType) {
    return fetch(
      (await this.API()) + `havesopper?ID=${ID}&itemType=${itemType}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  haveRundownSopper: async function (ID) {
    return fetch(
      (await this.API()) + `haverundownsopper?ID=${ID}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getRundownAndInfoByID: async function (rundownID) {
    return fetch(
      (await this.API()) + `getrundownandinfobyid?rundownID=${rundownID}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getRundownSopper: async function (ID) {
    return fetch((await this.API()) + `rundownsopper?ID=${ID}`, {
      method: "GET",
    }).then((response) => response.json());
  },
  getRundownModificationDetails: async function (ID) {
    return fetch((await this.API()) + `rundownmoddetails?ID=${ID}`, {
      method: "GET",
    }).then((response) => response.json());
  },
  addNewReport: async function (
    UserID,
    currentFolderID,
    Subject,
    Slug,
    MainFolderID,
    folderTypeIndex,
    uploadSerializeJson
  ) {
    let js = JSON.stringify({
      UserID: UserID,
      currentFolderID: currentFolderID,
      Subject: Subject,
      Slug: Slug,
      MainFolderID: MainFolderID,
      folderTypeIndex: folderTypeIndex,
      uploadSerializeJson: uploadSerializeJson,
    });
    return fetch((await this.API()) + `addnewreport`, {
      method: "POST",
      body: js,
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then((response) => response.json());
  },
  addNewReportWithBureauSend: async function (
    UserID,
    currentFolderID,
    Subject,
    Slug,
    MainFolderID,
    folderTypeIndex,
    uploadSerializeJson,
     BureauSendReportID,
      BureauSendNewstype,
      BureauID
  ) {
    let js = JSON.stringify({
      UserID: UserID,
      currentFolderID: currentFolderID,
      Subject: Subject,
      Slug: Slug,
      MainFolderID: MainFolderID,
      folderTypeIndex: folderTypeIndex,
      uploadSerializeJson: uploadSerializeJson,
      BureauSendReportID: BureauSendReportID,
      BureauSendNewstype: BureauSendNewstype,
      BureauID: BureauID,
    });
    return fetch((await this.API()) + `addnewreportwithbureausend`, {
      method: "POST",
      body: js,
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then((response) => response.json());
  },
  updateReport: async function (
    currentFolderID,
    moduserid,
    id,
    subject,
    slug,
    itemType,
    uploadSerializeJson
  ) {
    let js = JSON.stringify({
      currentFolderID: currentFolderID,
      moduserid: moduserid,
      id: id,
      subject: subject,
      slug: slug,
      itemType: itemType,
      uploadSerializeJson: uploadSerializeJson,
    });
    return fetch((await this.API()) + `updateReport`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: js,
    }).then((response) => response.json());
  },
  deleteReport: async function (reportID, itemType, UserName) {
    return fetch(
      (await this.API()) +
        `deleteReport?reportID=${reportID}&itemType=${itemType}&UserName=${UserName}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getSwitchAccountUsers: async function () {
    return fetch((await this.API()) + `getSwitchAccountUsers`, {
      method: "GET",
    }).then((response) => response.json());
  },
  getAdvanceSearchReportsRundown: async function (
    AdvanceWordSearchText,
    MainFolderItems,
    UserID,
    Fromdate,
    Todate
  ) {
    return fetch(
      (await this.API()) +
        `advanceSearchReportsRundown?AdvanceWordSearchText=${AdvanceWordSearchText}&MainFolderItems=${MainFolderItems}&UserID=${UserID}&Fromdate=${Fromdate}&Todate=${Todate}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
  },
  getDataForExcelExport: async function (
     folderTypeIndex, currentFolderID, UserID,  AdvanceSearchMainFolderItems,  SearchText,  SearchFromDate,  SearchToDate, HeaderText,makeNoArchieveIncludeInnerFolder
  ) {
    let js = JSON.stringify({
      folderTypeIndex:  folderTypeIndex, 
      currentFolderID:currentFolderID, 
      UserID:UserID,  
      AdvanceSearchMainFolderItems:AdvanceSearchMainFolderItems,  
      SearchText:SearchText,  
      SearchFromDate:SearchFromDate,  
      SearchToDate:SearchToDate, 
      HeaderText:HeaderText,
      makeNoArchieveIncludeInnerFolder:makeNoArchieveIncludeInnerFolder
    });
    return fetch((await this.API()) + `getDataForExcelExport`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: js,
    }).then((response) => response.json());
  },
  getDataForExcelExportArchiveOrCurrentWithTextSearch: async function (
     folderTypeIndex,  currentFolderID,  UserID,  SearchText,  SearchFromDate,  SearchToDate,  HeaderText
 ) {
   let js = JSON.stringify({
     folderTypeIndex:  folderTypeIndex, 
     currentFolderID:currentFolderID, 
     UserID:UserID,  
     SearchText:SearchText,  
     SearchFromDate:SearchFromDate,  
     SearchToDate:SearchToDate, 
     HeaderText:HeaderText,
   });
   return fetch((await this.API()) + `getDataForExcelExportArchiveOrCurrentWithTextSearch`, {
     method: "POST",
     headers: new Headers({ "Content-Type": "application/json" }),
     body: js,
   }).then((response) => response.json());
 },
 getDataForExcelExportRundown: async function (
  RundownID) {
let js = JSON.stringify({
  RundownID:  RundownID
});
return fetch((await this.API()) + `getDataForExcelExportRundown`, {
  method: "POST",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: js,
}).then((response) => response.json());
},
};
