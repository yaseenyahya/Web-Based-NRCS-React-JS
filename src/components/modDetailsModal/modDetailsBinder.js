import DiffMatchPatch from "diff-match-patch";
export default class modDetailsBinder {
  currentIndex = 0;
  Data = null;

  constructor(bindValuesCallback) {
    this.bindValuesCallback = bindValuesCallback;
  }
  getBindValues(previousArrowState, nextArrowState, readDetails) {
    // console.log( this.Data);

    let title = "";
    let contentTextHtml = "";
    let correctionDetail = "";
    if (this.Data.length <= 1) nextArrowState = false;

   if(this.Data.length > 0){
     title =
      this.Data[this.currentIndex].Type +
      ": " +
      this.Data[this.currentIndex].CreationDate +
      " " +
      this.Data[this.currentIndex].CreationTime +
      "  By: " +
      this.Data[this.currentIndex].UserName +
      " Folder: " +
      this.Data[this.currentIndex].Folder;

    if (this.currentIndex < this.Data.length - 1) {
      let currentSlugHistory = this.Data[this.currentIndex].SlugHistory;

      let nextSlugHistory = this.Data[this.currentIndex + 1].SlugHistory;
      const DIFF = new DiffMatchPatch();
      let diffs = DIFF.diff_main(nextSlugHistory, currentSlugHistory);

      DIFF.diff_cleanupSemantic(diffs);
      correctionDetail =
        diffs.filter(function (itm) {
          return (
            itm[0] == DiffMatchPatch.DIFF_DELETE ||
            itm[0] == DiffMatchPatch.DIFF_INSERT
          );
        }).length + " correction found";

      diffs.map((itm) => {
        if (itm[0] == DiffMatchPatch.DIFF_INSERT) {
          let color = "#4a924d";
          let textDecorationLine = "none";
          contentTextHtml = `${contentTextHtml}<span style="font-weight: bold;${(itm[1].replace(/^\s+|\s+$/gm,'') == ""
          ? "background:green;"
          : "color: " + color)}">${itm[1]}</span>`;

          //PrevnewSpan.ForeColor = Color.Blue;
          //PrevnewSpan.Tag = "HistoryInserted," + MOD_DetailsList[CurrentIndex].UserName + "," + MOD_DetailsList[CurrentIndex].CreationTime;
        } else if (itm[0] == DiffMatchPatch.DIFF_DELETE) {
          let color = "#d23431";
          let textDecorationLine = "line-through";
          contentTextHtml = `${contentTextHtml}<span style="color: ${color};text-decoration: ${textDecorationLine};vertical-align: super;">${itm[1]}</span>`;
        } else {
          contentTextHtml = `${contentTextHtml}${itm[1]}`;
        }
      });
      contentTextHtml = `${contentTextHtml}`;
    } else {
      correctionDetail = "0 correction found";
      contentTextHtml = `${
        this.Data[this.currentIndex].SlugHistory
      }`;
    }

    this.bindValuesCallback(
      title,
      contentTextHtml,
      previousArrowState,
      nextArrowState,
      correctionDetail,
      readDetails
    );
   }else{
    this.bindValuesCallback(
      "No Modification Found",
      "",
      false,
      false,
      "0 correction found",
      readDetails
    );
   }
  }
}
