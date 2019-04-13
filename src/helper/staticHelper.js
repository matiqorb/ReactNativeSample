
import {
    WorkTimeDayType,
    RequestType,
    MissionType,
    LeaveType
  } from "./enums";
function isBusy(asyncTaskIndicator,items=[]){
    return asyncTaskIndicator.some(elem=>items.includes(elem));
}
function validateWifis(availableWifis,wifiIndicators=[]){
    return true;
    return availableWifis.some(elem=>wifiIndicators.includes(elem));
}
function getWorkTypeIconName(workType){
    switch (workType) {
      case WorkTimeDayType.WorkDay:
        return "check-all"
        case WorkTimeDayType.Holiday:
        return "calendar-heart"
        case WorkTimeDayType.LeaveDay:
        return "coffee"
        case WorkTimeDayType.MissionDay:
        return "airplane-takeoff"
        case WorkTimeDayType.Absent:
        return "calendar-alert"
        case WorkTimeDayType.Incomplete:
        return "alert-outline"
        case WorkTimeDayType.Error:
        return "alert-circle-outline"
      default:
        return ""
    }
  }
function getRequestTypeFullName(type,subType){
    return (RequestType.Labels[type].concat(type != RequestType.ForgottenRequest
        ? " " +
          (type == RequestType.Leave
            ? LeaveType.Labels[subType]
            : MissionType.Labels[subType])
        : ""))
}
export default staticHelper={
    isBusy,
    validateWifis,
    getWorkTypeIconName,
    getRequestTypeFullName
}