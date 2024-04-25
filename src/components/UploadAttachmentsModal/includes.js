import _ from "lodash";
import { resolveSettings } from "../../auth/resolveSettings";
import moment from "moment";
import ApiCalls from "../../api/ApiCalls";
export default class includes {
  getUploadFilesbyStatus = (uploadFiles, status) => {
    let files = _.filter(
      uploadFiles,
      (ele) => ele.status && ele.status == status
    );
    files = files == undefined ? [] : files;
    return files;
  };
  getUploadFilesbyTwoStatus = (uploadFiles, status1, status2) => {
    let files = _.filter(
      uploadFiles,
      (ele) => ele.status && (ele.status == status1 || ele.status == status2)
    );
    files = files == undefined ? [] : files;
    return files;
  };
  getExtension = (path) => {
    var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
      // (supports `\\` and `/` separators)
      pos = basename.lastIndexOf("."); // get last position of `.`

    if (basename === "" || pos < 1)
      // if file name is empty or ...
      return ""; //  `.` not found (-1) or comes first (0)

    return basename.slice(pos + 1); // extract extension ignoring `.`
  };
  createFileNameIfNotCreated = async (currentFileObj) => {
    if (currentFileObj.filenameCreated == undefined) {
      var datetimeNow = moment().format("DD-MM-YYYY_hh-mm-ss_a");
      var fileIDGenerated = "";

      try {
        await ApiCalls.getUploadID().then((response) => {
          response.json().then((responseJson) => {
            fileIDGenerated = responseJson;
          });
        });
      } catch (ex) {
        console.log(ex);
      }

      var fileExtension = this.getExtension(currentFileObj.filename);
      let filenameCreated =
        fileIDGenerated +
        "_" +
        currentFileObj.filename.replace(fileExtension, "").split(".").join("") +
        "_AxonMobile_" +
        new resolveSettings().resolveName() +
        "_ " +
        datetimeNow +
        "." +
        fileExtension;
      filenameCreated = filenameCreated.split(" ").join("_");
      currentFileObj.filenameCreated = filenameCreated;
    }
  };
}
