import {
  WorkGroupSettingActions
} from "../../helper/constants";
import workGroupService from "../../services/workGroupService";
export function refresh(model) {
  return (dispatch, getState) => {
    dispatch({
      type: WorkGroupSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return workGroupService.getPaged(model)
      .then(response => {
        dispatch({
          type: WorkGroupSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function update(model) {
  return (dispatch, getState) => {
    dispatch({
      type: WorkGroupSettingActions.AddStatusKey,
      payload: "update"
    });
    return workGroupService.update(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: WorkGroupSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: WorkGroupSettingActions.Add,
            payload: response
          });

        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: WorkGroupSettingActions.AddStatusKey,
      payload: "remove"
    });
    return workGroupService.remove(model)
      .then(response => {
        dispatch({
          type: WorkGroupSettingActions.Remove,
          payload: response
        });
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "remove"
        });
        Promise.refresh(error);
      });
  };
}
export function loadEditItem(model) {
  return (dispatch, getState) => {
    console.log("model:", model);
    dispatch({
      type: WorkGroupSettingActions.AddStatusKey,
      payload: "loadEditItem"
    });
    workGroupService.getItem(model.id)
      .then(response => {
        dispatch({
          type: WorkGroupSettingActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: WorkGroupSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function emptyEditItem() {
  return {
    type: WorkGroupSettingActions.EmptyEditItem,
    payload: null
  };
}
