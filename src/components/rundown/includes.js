import { EuroTwoTone } from "@material-ui/icons";
import folderDataFeederIncludes from "../folderDataFeeder/includes";
export default class includes {
  endRowIndex = 0;
  makeRundownColumnToUserDefined(
    RundownDataColumn,
    searchText,
    RundownOtherSettings
  ) {
    var rundownColumnArrayUserDefined = [];
    RundownDataColumn.rSegment.show = RundownOtherSettings.ShowSegment;
    RundownDataColumn.rSegment.headerText = RundownOtherSettings.SegmentText;

    RundownDataColumn.rNewsFormat.show = RundownOtherSettings.ShowNewsFormat;
    RundownDataColumn.rNewsFormat.headerText =
      RundownOtherSettings.NewsFormatText;

    RundownDataColumn.rWith.show = RundownOtherSettings.ShowWith;
    RundownDataColumn.rWith.headerText = RundownOtherSettings.WithText;

    RundownDataColumn.rSpecialNotes.show =
      RundownOtherSettings.ShowSpecialNotes;
    RundownDataColumn.rSpecialNotes.headerText =
      RundownOtherSettings.SpecailNotesText;

    RundownDataColumn.rAiredStatus.show = RundownOtherSettings.ShowAiredStatus;

    RundownDataColumn.rAnchorName.show = RundownOtherSettings.ShowAnchorName;

    RundownDataColumn.rSpecialNotes.show =
      RundownOtherSettings.ShowSpecialNotes;

    RundownDataColumn.rNlevel.show = RundownOtherSettings.ShowContentStatus;

    Object.keys(RundownDataColumn).map((columnName) => {
      if (RundownDataColumn[columnName].show) {
        rundownColumnArrayUserDefined.push(RundownDataColumn[columnName]);
      }
    });
    if (searchText != "") {
      rundownColumnArrayUserDefined.unshift({
        label: "Search",
        name: "Search",
      });
    }
    return rundownColumnArrayUserDefined;
  }
  bindRundownData(rundownDataList, searchText, rundownColumnArrayUserDefined) {
    var rowData = [];
    let folderDataFeederIncludesObj = new folderDataFeederIncludes();
    if (rundownDataList != null) {
      rundownDataList.map((itm) => {
        // this.checkRightContainerUpdate(editorRundownModal, itm,searchText)

        var cellData = [];

        rundownColumnArrayUserDefined.map(({ name }) => {
          var columnName = name;
          if (columnName == "Search") {
            cellData.push({
              text: folderDataFeederIncludesObj.multiSearchOr(
                itm.rDetailStory,
                folderDataFeederIncludesObj.splitMulti(searchText, [",", "،"])
              )
                ? "showSearchIcon"
                : "",
              cellStyle: null,
            });
          } else {
            var cellStyle = { fontSize: 18 };
            if (columnName == "SopperCode") {
              cellData.push({
                text: "",
                cellStyle:
                  itm.SopperAvailable == "1"
                    ? { backgroundColor: "yellow" }
                    : null,
              });
            } else if (columnName == "CCode" || columnName == "CCode2") {
              if (itm.rid != this.endRowIndex) {
                if (itm.rDetailStory != "" && itm.rFinalApproval != "√") {
                  cellStyle = { backgroundColor: "#800000", fontSize: 18 };
                } else if (itm.rFinalApproval != "√") {
                  cellStyle = { backgroundColor: "#9932cc", fontSize: 18 };
                } else if (itm.rFinalApproval == "√") {
                  cellStyle = { backgroundColor: "#006400", fontSize: 18 };
                }
              }

              cellData.push({
                text: "",
                cellStyle: cellStyle,
              });
            } else {
              cellData.push({ text: itm[columnName], cellStyle: cellStyle });
            }
          }
        });
        var rowStyle = null;
        if (itm.rid == this.endRowIndex)
          rowStyle = { backgroundColor: "black" };
        else if (itm.rAiredStatus == "√") {
          rowStyle = { backgroundColor: "yellow" };
        } else if (itm.rBreakStatus == "√") {
          rowStyle = { backgroundColor: "#61D0EE" };
        }
        rowData.push({ rowID: itm.rid, data: cellData, rowStyle: rowStyle });
      });
    }
    //console.log(rowData);
    return rowData;
  }
}
