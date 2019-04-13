import {
  UserEntryActions, AppConstants
} from "../../helper/constants";
import  userEntryService from "../../services/userEntryService";
export function nextPage(refresh=false) {
  return (dispatch, getState) => {
    dispatch({
      type: UserEntryActions.AddStatusKey,
      payload: refresh?"refresh":"nextPage"
    });
    const {userEntries:{currentPage}}=getState();
   return userEntryService.getPagedOfflineEntry ({pageSize: AppConstants.defaultPageSize,pageCount:refresh?1:currentPage+1})
      .then(response => {
        dispatch({
          type: refresh?UserEntryActions.Refresh:UserEntryActions.NextPage,
          payload: response
        });
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: refresh?"refresh":"nextPage"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: refresh?"refresh":"nextPage"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function refreshAll() {
  return (dispatch, getState) => {
    dispatch({
      type: UserEntryActions.AddStatusKey,
      payload: "refreshAll"
    });
   return userEntryService.getAllPaged ({pageSize: AppConstants.defaultPageSize,pageCount:1})
      .then(response => {
        dispatch({
          type: UserEntryActions.RefreshAllUsers,
          payload: response
        });
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "refreshAll"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
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
      type: UserEntryActions.AddStatusKey,
      payload: "nextPageAll"
    });
    const {userEntries:{allUserCurrentPage}}=getState();
   return userEntryService.getAllPaged ({pageSize: AppConstants.defaultPageSize,pageCount:allUserCurrentPage+1})
      .then(response => {
        dispatch({
          type: UserEntryActions.NextPageAllUsers,
          payload: response
        });
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function reverseRemoveStatus(id) {
  return (dispatch, getState) => {
    dispatch({
      type: UserEntryActions.AddStatusKey,
      payload: "reverseRemoveStatus"
    });
    dispatch({
      type: UserEntryActions.ReverseRemoveStatus,
      payload: id
    });
   return userEntryService.reverseRemoveStatus (id)
      .then(response => {
       
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "reverseRemoveStatus"
        });
      })
      .catch(error => {
        dispatch({
          type: UserEntryActions.ReverseRemoveStatus,
          payload: id
        });
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "reverseRemoveStatus"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function addOfflineEntry(model) {
  return (dispatch, getState) => {
    dispatch({
      type: UserEntryActions.AddStatusKey,
      payload: "addOfflineEntry"
    });
    return userEntryService.addOfflineEntry(model)
      .then(response => {
        console.log("addOfflineEntry:",response);
        dispatch({
          type: UserEntryActions.AddEntry,
          payload: response
        });
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "addOfflineEntry"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "addOfflineEntry"
        });
        Promise.reject(error);
      });
  };
 }
 export function syncEntries() {
  return (dispatch, getState) => {
    dispatch({
      type: UserEntryActions.AddStatusKey,
      payload: "syncEntries"
    });
    return userEntryService.syncEntries([])
      .then(response => {
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "syncEntries"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UserEntryActions.RemoveStatusKey,
          payload: "syncEntries"
        });
        Promise.reject(error);
      });
  };
}

