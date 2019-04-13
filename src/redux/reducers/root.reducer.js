import { combineReducers } from "redux";
import {userProfile} from "./userProfileReducer"
import {wifiSignalSetting} from "./wifiSignalSettingReducer"
import {asyncTaskIndicator} from "../reducers/asyncTaskIndicator"
import { timeIntervals} from "../reducers/timeIntervalsReducer"
import { shifts} from "../reducers/shiftsReducer"
import { workGroups} from "../reducers/workGroupReducer"
import { users} from "../reducers/usersReducer"
import { calendars} from "../reducers/calendarReducer"
import { generalSetting} from "../reducers/generalSettingReducer"
import { userRequests} from "../reducers/userRequestsReducer"
import { reducer as formReducer } from 'redux-form';
import {userTasks} from "./userTasksReducer"
import {userEntries} from "./usersEntryReducer"
import {userWorkTimes} from "./userWorkTimeReducer"
import {supervisorDashboard} from "./supervisorDashboardReducer"
export default  combineReducers({
  asyncTaskIndicator,
  userProfile,
  wifiSignalSetting,
  timeIntervals,
  shifts,
  workGroups,
  users,
  calendars,
  generalSetting,
  userRequests,
  userTasks,
  userEntries,
  userWorkTimes,
  supervisorDashboard,
  form: formReducer,
});
