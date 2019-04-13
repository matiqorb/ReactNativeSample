import dbContext, { Domains } from "../../database/dbContext";
import {
  UserRequestActions,
  AppConstants
} from "../../helper/constants";
import  userRequestService from "../../services/userRequestService";
export function refresh() {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "refresh"
    });
   return userRequestService.getPaged({pageSize: AppConstants.defaultPageSize,pageCount:1})
      .then(response => {
        dispatch({
          type: UserRequestActions.Refresh,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "refresh"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "refresh"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function nextPage() {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "nextPage"
    });
    const {userRequests:{currentPage}}=getState();
   return userRequestService.getPaged({pageSize: AppConstants.defaultPageSize,pageCount:currentPage+1})
      .then(response => {
        dispatch({
          type: UserRequestActions.NextPage,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "nextPage"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "nextPage"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function refreshAll() {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "refreshAll"
    });
   return userRequestService.getAllPaged({pageSize: AppConstants.defaultPageSize,pageCount:1})
      .then(response => {
        dispatch({
          type: UserRequestActions.RefreshAllUsers,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "refreshAll"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "refreshAll"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function nextPageAll() {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "nextPageAll"
    });
   const {userRequests:{allUserCurrentPage}}=getState();
   console.log("allUserCurrentPage:",allUserCurrentPage);
   
   return userRequestService.getAllPaged({pageSize: AppConstants.defaultPageSize,pageCount:allUserCurrentPage+1})
      .then(response => {
        dispatch({
          type: UserRequestActions.NextPageAllUsers,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function addForgotten(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "addUserRequest"
    });
    return userRequestService.addForgotten(model)
      .then(response => {
        dispatch({
          type: UserRequestActions.Add,
          payload: response
        });

        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
        Promise.reject(error);
      });
  };
}
export function addLeave(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "addUserRequest"
    });
    return userRequestService.addLeave(model)
      .then(response => {
        dispatch({
          type: UserRequestActions.Add,
          payload: response
        });

        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
        Promise.reject(error);
      });
  };
}
export function addMission(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "addUserRequest"
    });
    return userRequestService.addMission(model)
      .then(response => {
        dispatch({
          type: UserRequestActions.Add,
          payload: response
        });

        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "addUserRequest"
        });
        Promise.reject(error);
      });
  };
}
export function remove(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserRequestActions.AddStatusKey,
      payload: "remove"
    });
    return userRequestService.remove(model)
      .then(response => {
        dispatch({
          type: UserRequestActions.Remove,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "remove"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
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
      type: UserRequestActions.AddStatusKey,
      payload: "loadEditItem"
    });
    userRequestService.getItem(model.id)
      .then(response => {
        dispatch({
          type: UserRequestActions.LoadEditItem,
          payload: response
        });
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserRequestActions.RemoveStatusKey,
          payload: "loadEditItem"
        });
      });
  };
}
export function emptyEditItem() {
  return {
    type: UserRequestActions.EmptyEditItem,
    payload: null
  };
}
