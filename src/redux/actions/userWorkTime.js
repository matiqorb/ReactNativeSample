import { UserWorkTimeActions, AppConstants } from "../../helper/constants";
import userWorkTimeService from "../../services/userWorkTimeService";
export function refresh(filterType) {
  return (dispatch, getState) => {
    dispatch({
      type: UserWorkTimeActions.AddStatusKey,
      payload: "refresh"
    });
    return userWorkTimeService
      .getPaged({
        pageSize: AppConstants.defaultPageSize,
        pageCount: 1,
        filterType: filterType
      })
      .then(response => {
        dispatch({
          type: UserWorkTimeActions.Refresh,
          payload: response
        });
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "refresh"
        });
        return response.length;
      })
      .catch(error => {
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "refresh"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function nextPage(filterType) {
  return (dispatch, getState) => {
    dispatch({
      type: UserWorkTimeActions.AddStatusKey,
      payload: "nextPage"
    });
    const {
      userWorkTimes: { currentPage }
    } = getState();
    return userWorkTimeService
      .getPaged({
        pageSize: AppConstants.defaultPageSize,
        pageCount: currentPage + 1,
        filterType: filterType
      })
      .then(response => {
        dispatch({
          type: UserWorkTimeActions.NextPage,
          payload: response
        });
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "nextPage"
        });
        return response.length;
      })
      .catch(error => {
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
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
      type: UserWorkTimeActions.AddStatusKey,
      payload: "refreshAll"
    });
    return userWorkTimeService
      .getAllPaged({ pageSize: AppConstants.defaultPageSize, pageCount: 1 })
      .then(response => {
        dispatch({
          type: UserWorkTimeActions.RefreshAllUsers,
          payload: response
        });
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "refreshAll"
        });
        return response.length;
      })
      .catch(error => {
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
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
      type: UserWorkTimeActions.AddStatusKey,
      payload: "nextPageAll"
    });
    const {
      userWorkTimes: { allUserCurrentPage }
    } = getState();
    return userWorkTimeService
      .getAllPaged({
        pageSize: AppConstants.defaultPageSize,
        pageCount: allUserCurrentPage + 1
      })
      .then(response => {
        dispatch({
          type: UserWorkTimeActions.NextPageAllUsers,
          payload: response
        });
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        return response.length;
      })
      .catch(error => {
        dispatch({
          type: UserWorkTimeActions.RemoveStatusKey,
          payload: "nextPageAll"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function emptyUserWorkTime() {
  return (dispatch, getState) => {
    dispatch({
      type: UserWorkTimeActions.EmptyUserWorkTime,
      payload: null
    });
  };
}
