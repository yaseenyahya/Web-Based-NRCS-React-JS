import { combineReducers } from "redux";
import { LoginReducer } from "./LoginReducer";
import { DialogReducer } from "./DialogReducer";
import { HeaderReducer } from "./HeaderReducer";
import { UserPanelReducer } from "./UserPanelReducer";
import {TreeViewReducer} from "./TreeViewReducer";
import {CRUDReducer} from "./CRUDReducer";
import {EditorViewReducer} from "./EditorViewReducer";
import {MediaPlayerModalReducer} from "./MediaPlayerModalReducer";
import {SopperModalReducer} from "./SopperModalReducer";
import {ModDetailsModalReducer} from "./ModDetailsModalReducer";
import {RundownReducer} from "./RundownReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";
import {SwitchAccountModalReducer} from "./SwitchAccountModalReducer";
import {SaveAsModalReducer} from "./SaveAsModalReducer";
import {DeleteItemReducer} from "./DeleteItemReducer";
import {AddItemModalReducer} from "./AddItemModalReducer";
import {EditItemModalReducer} from "./EditItemModalReducer";
import {UploadAttachmentsModalReducer} from "./UploadAttachmentsModalReducer";
import {CameraModalReducer} from "./CameraModalReducer";
const rootReducer = combineReducers({
  LoginReducer,
  DialogReducer,
  HeaderReducer,
  UserPanelReducer,
  TreeViewReducer,
  CRUDReducer,
  EditorViewReducer,
  MediaPlayerModalReducer,
  SopperModalReducer,
  ModDetailsModalReducer,
  RundownReducer,
  ChangePasswordReducer,
  SwitchAccountModalReducer,
  SaveAsModalReducer,
  DeleteItemReducer,
  AddItemModalReducer,
  UploadAttachmentsModalReducer,
  EditItemModalReducer,
  CameraModalReducer
});

export default rootReducer;
