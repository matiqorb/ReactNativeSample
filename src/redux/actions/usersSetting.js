import dbContext, { Domains } from "../../database/dbContext";
import {
  UsersSettingActions
} from "../../helper/constants";
import usersService from "../../services/usersService";
export function refresh(model={}) {
  return (dispatch, getState) => {
    dispatch({
      type: UsersSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return usersService.getPaged(model)
      .then(response => {
        dispatch({
          type: UsersSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
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
      type: UsersSettingActions.AddStatusKey,
      payload: "update"
    });
    return usersService.update(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: UsersSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: UsersSettingActions.Add,
            payload: response
          });

        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UsersSettingActions.AddStatusKey,
      payload: "remove"
    });
    return usersService.remove(model)
      .then(response => {
        dispatch({
          type: UsersSettingActions.Remove,
          payload: response
        });
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
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
      type: UsersSettingActions.AddStatusKey,
      payload: "loadEditItem"
    });
    usersService.getItem(model.id)
      .then(response => {
        dispatch({
          type: UsersSettingActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UsersSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function emptyEditItem() {
  return {
    type: UsersSettingActions.EmptyEditItem,
    payload: null
  };
}
