import dbContext, { Domains } from "../../database/dbContext";
import {
  UserTaskActions
} from "../../helper/constants";
import  userTaskService from "../../services/userTaskService";
export function refresh(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserTaskActions.AddStatusKey,
      payload: "refresh"
    });
   return userTaskService.getPaged(model)
      .then(response => {
        dispatch({
          type: UserTaskActions.Refresh,
          payload: response
        });
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "refresh"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}

export function changeStatus(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserTaskActions.AddStatusKey,
      payload: "changeStatus"
    });
    return userTaskService.changeStatus(model)
      .then(response => {
        dispatch({
          type: UserTaskActions.ChangeStatus,
          payload: response
        });
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "changeStatus"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "changeStatus"
        });
        Promise.refresh(error);
      });
  };
}
export function loadDetailItem(model) {
  return (dispatch, getState) => {
    console.log("model:", model);
    dispatch({
      type: UserTaskActions.AddStatusKey,
      payload: "loadDetailItem"
    });
    userTaskService.getItem(model.id)
      .then(response => {
        dispatch({
          type: UserTaskActions.LoadDetailItem,
          payload: response
        });
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "loadDetailItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserTaskActions.RemoveStatusKey,
          payload: "loadDetailItem"
        });
      });
  };
}
export function emptyDetialItem() {
  return {
    type: UserTaskActions.EmptyDetailItem,
    payload: null
  };
}
