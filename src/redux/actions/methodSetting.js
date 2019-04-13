import MethodSettingService from "../../services/methodSettingService"
import { addAsyncTaskIndicator,removeAsyncTaskIndicator} from "../actions/asyncTaskIndicator"

export function getDefault() {
  return (dispatch, getState) => {
    dispatch(addAsyncTaskIndicator("getDefault"));
    return MethodSettingService.getDefault()
      .then(response => {
        dispatch(removeAsyncTaskIndicator("getDefault"));
        return response;
      })
      .catch(error => {
        dispatch(removeAsyncTaskIndicator("getDefault"));
        return Promise.reject(error);
      });
  };
}
export function changeDefaultMethod(defaultMethod) {
  return (dispatch, getState) => {
    dispatch(addAsyncTaskIndicator("changeDefaultMethod"));
    return MethodSettingService.changeDefaultMethod(defaultMethod)
      .then(response => {
        dispatch(removeAsyncTaskIndicator("changeDefaultMethod"));
        return response;
      })
      .catch(error => {
        dispatch(removeAsyncTaskIndicator("changeDefaultMethod"));
        return Promise.reject(error);
      });
  };
}
