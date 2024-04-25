import { UploadType } from "../mediaPlayerModal/UploadType";

export default class includes {
  getUploadFiles = (uploadFiles) => {
    if (uploadFiles && uploadFiles.length > 0)
      uploadFiles = JSON.parse(uploadFiles);
    else uploadFiles = [];
    return uploadFiles;
  };
  getSearchContentText = (searchText, slugText) => {
    if (searchText != "") {
      var textArray = this.splitInObject(slugText, searchText);
      var textHTML = "";
      textArray.map((text) => {
        textHTML +=
          text.highlightp != undefined
            ? '<mark style="color:red">' + text.highlightp + "</mark>"
            : "<span>" + text.ordinaryp + "</span>";
      });

      return textHTML;
    }
    return slugText;
  };
  splitArrayInObject(textArray, highlightText) {
    textArray.forEach(function (textObject, index) {
      if (textObject.ordinaryp != undefined) {
        var object = this.splitInObject(textObject.ordinaryp, highlightText);
        textArray.splice(index, 1, ...object);
      }
    });
    return textArray;
  }
  splitInObject(text, highlightText) {
    var paragraphObject = [];
    var re = new RegExp(highlightText, "i");
    var res = text.split(re);
    var incLength = 1;
    res.forEach(function (val) {
      if (val.toLowerCase() == highlightText.toLowerCase())
        paragraphObject.push({ highlightp: highlightText });
      else paragraphObject.push({ ordinaryp: val });
      if (incLength < res.length)
        paragraphObject.push({ highlightp: highlightText });
      incLength++;
    });

    return paragraphObject;
  }

  splitInHighlightText(text, highlightTextArray) {
    //highlight on ly first word
    var ItemsObject = null;

    var isFirstCall = true;

    highlightTextArray.forEach((highlightText) => {
      if (isFirstCall) {
        ItemsObject = this.splitInObject(text, highlightText);
        isFirstCall = false;
      } else {
        ItemsObject = this.splitArrayInObject(ItemsObject, highlightText);
      }
    });

    return ItemsObject;
  }
  hasImageExtension = (source) => {
    source = source.toLowerCase();
    return (
      source.endsWith(".png") ||
      source.endsWith(".jpg") ||
      source.endsWith(".jpeg") ||
      source.endsWith(".bmp") ||
      source.endsWith(".tif") ||
      source.endsWith(".gif")
    );
  };
  hasAudioVideoExtension = (source) => {
    source = source.toLowerCase();

    return (
      source.endsWith(".aif") ||
      source.endsWith(".mp4") ||
      source.endsWith(".wav") ||
      source.endsWith(".flv") ||
      source.endsWith(".wmv") ||
      source.endsWith(".mov") ||
      source.endsWith(".3gp")
    );
  };
  calculateTL(value) {
   
    let text_ = value == null ? "" : value;
    text_ = text_.replace(/\s/g, "");

    let wordCount = (text_.length / 12).toFixed(0);

    let totalSeconds = wordCount > 0 ? wordCount - 1 : wordCount;
    let minutes = (totalSeconds / 60).toFixed(0);

    let seconds = totalSeconds % 60;
    let tlValue =
      (minutes > 9 ? "" + minutes : "0" + minutes) +
      ":" +
      (seconds > 9 ? "" + seconds : "0" + seconds);
  
    return tlValue;
  }
  getUploadFilesWithSourceUrl = (
    uploadFiles,
    axonSourceAppUrl,
    voSourceUrl,
    addObject
  ) => {
    let files = addObject ? uploadFiles :  this.getUploadFiles(uploadFiles);

    let mediaFiles = [];
    files.map((item) => {
      let fileWithSource = null;
      if (
        (item.type == UploadType.EPES || item.type == UploadType.AXON) &&
        !item.filename.startsWith("http://") &&
        !item.filename.startsWith("https://")
      ) {
        fileWithSource = axonSourceAppUrl + item.filename;
      } else if (item.type == UploadType.VO) {
        fileWithSource = voSourceUrl + item.filename;
      } else fileWithSource = item.filename;

      if (!addObject) {
        mediaFiles.push({
          id: fileWithSource,
          text: item.filename,
        });
      } else {
        item.fileWithSource = fileWithSource;
      }
    });
  
    if (!addObject) {
      return mediaFiles;
    } else {
      return files;
    }
  };
}
