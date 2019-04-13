import dbContext, { Domains } from "../../database/dbContext";
import {
  ShiftSettingActions
} from "../../helper/constants";
import shiftService from "../../services/shiftService";

export function refresh(model) {
  return (dispatch, getState) => {
    dispatch({
      type: ShiftSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return shiftService.getPaged(model)
      .then(response => {
        dispatch({
          type: ShiftSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
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
      type: ShiftSettingActions.AddStatusKey,
      payload: "update"
    });
    return shiftService.update(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: ShiftSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: ShiftSettingActions.Add,
            payload: response
          });

        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: ShiftSettingActions.AddStatusKey,
      payload: "remove"
    });
    return shiftService.remove(model)
      .then(response => {
        dispatch({
          type: ShiftSettingActions.Remove,
          payload: response
        });
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
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
      type: ShiftSettingActions.AddStatusKey,
      payload: "loadEditItem"
    });
    shiftService.getItem(model.id)
      .then(response => {
        dispatch({
          type: ShiftSettingActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: ShiftSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function emptyEditItem() {
  return {
    type: ShiftSettingActions.EmptyEditItem,
    payload: null
  };
}
