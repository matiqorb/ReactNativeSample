import dbContext, { Domains } from "../../database/dbContext";
import {
  CalendarSettingActions
} from "../../helper/constants";
import calendarService from "../../services/calendarService";

export function refresh(model) {
  return (dispatch, getState) => {
    dispatch({
      type: CalendarSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return calendarService.getPaged(model)
      .then(response => {
        dispatch({
          type: CalendarSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
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
      type: CalendarSettingActions.AddStatusKey,
      payload: "update"
    });
    return calendarService.update(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: CalendarSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: CalendarSettingActions.Add,
            payload: response
          });

        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: CalendarSettingActions.AddStatusKey,
      payload: "remove"
    });
    return calendarService.remove(model)
      .then(response => {
        dispatch({
          type: CalendarSettingActions.Remove,
          payload: response
        });
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
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
      type: CalendarSettingActions.AddStatusKey,
      payload: "loadEditItem"
    });
    calendarService.getItem(model.id)
      .then(response => {
        dispatch({
          type: CalendarSettingActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function loadHolidays(model) {
  return (dispatch, getState) => {
   
    dispatch({
      type: CalendarSettingActions.AddStatusKey,
      payload: "loadHolidays"
    });
    return calendarService.getHolidays(model)
      .then(response => {
       
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "loadHolidays"
        });
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "loadHolidays"
        });
        Promise.reject(error);
      });
  };
}
export function addHoliday(model) {
  return (dispatch, getState) => {
   
    dispatch({
      type: CalendarSettingActions.AddStatusKey,
      payload: "addHoliday"
    });
    return calendarService.addHoliday(model)
      .then(response => {
       
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "addHoliday"
        });
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "addHoliday"
        });
        Promise.reject(error);
      });
  };
}
export function deleteHoliday(model) {
  return (dispatch, getState) => {
   
    dispatch({
      type: CalendarSettingActions.AddStatusKey,
      payload: "deleteHoliday"
    });
    return calendarService.addHoliday(model)
      .then(response => {
       
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "deleteHoliday"
        });
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: CalendarSettingActions.RemoveStatusKey,
          payload: "deleteHoliday"
        });
        Promise.reject(error);
      });
  };
}
export function emptyEditItem() {
  return {
    type: CalendarSettingActions.EmptyEditItem,
    payload: null
  };
}
