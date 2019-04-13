import dbContext, { Domains } from "../../database/dbContext";
import {
  TimeIntervalsSettingActions
 
} from "../../helper/constants";
import TimeIntervalsService from "../../services/timeIntervalsService";

export function refresh(model) {
  return (dispatch, getState) => {
    dispatch({
      type: TimeIntervalsSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return TimeIntervalsService.getPaged(model)
      .then(response => {
        dispatch({
          type: TimeIntervalsSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
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
      type: TimeIntervalsSettingActions.AddStatusKey,
      payload: "update"
    });
    return TimeIntervalsService.update(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: TimeIntervalsSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: TimeIntervalsSettingActions.Add,
            payload: response
          });

        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: TimeIntervalsSettingActions.AddStatusKey,
      payload: "remove"
    });
    return TimeIntervalsService.remove(model)
      .then(response => {
        dispatch({
          type: TimeIntervalsSettingActions.Remove,
          payload: response
        });
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
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
      type: TimeIntervalsSettingActions.AddStatusKey,
      payload: "loadEditItem"
    });
    TimeIntervalsService.getItem(model.id)
      .then(response => {
        dispatch({
          type: TimeIntervalsSettingActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TimeIntervalsSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function emptyEditItem() {
  return {
    type: TimeIntervalsSettingActions.EmptyEditItem,
    payload: null
  };
}
