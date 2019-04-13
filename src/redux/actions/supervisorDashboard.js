import {
  SupervisorDashboardActions,
  AppConstants
} from "../../helper/constants";
import  supervisorDashboardService from "../../services/supervisorDashboardService";

export function refreshMySubGroupUsers(filter) {
  return (dispatch, getState) => {
    dispatch({
      type: SupervisorDashboardActions.AddStatusKey,
      payload: "refreshMySubGroupUsers"
    });
   return supervisorDashboardService.getMySubGroupUsersPaged({pageSize: AppConstants.defaultPageSize,pageCount:1,filter})
      .then(response => {
        dispatch({
          type: SupervisorDashboardActions.RefreshAllSubGroupUsers,
          payload: response
        });
        dispatch({
          type: SupervisorDashboardActions.RemoveStatusKey,
          payload: "refreshMySubGroupUsers"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: SupervisorDashboardActions.RemoveStatusKey,
          payload: "refreshMySubGroupUsers"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function nextPageMySubGroupUsers(filter) {
  return (dispatch, getState) => {
    dispatch({
      type: SupervisorDashboardActions.AddStatusKey,
      payload: "nextPageMySubGroupUsers"
    });
    const {supervisorDashboard:{currentPage}}=getState();
   return supervisorDashboardService.getMySubGroupUsersPaged({pageSize: AppConstants.defaultPageSize,pageCount:currentPage+1,filter})
      .then(response => {
        dispatch({
          type: SupervisorDashboardActions.nextPageAllSubGroupUsers,
          payload: response
        });
        dispatch({
          type: SupervisorDashboardActions.RemoveStatusKey,
          payload: "nextPageMySubGroupUsers"
        });
        return response.length
      })
      .catch(error => {
        dispatch({
          type: SupervisorDashboardActions.RemoveStatusKey,
          payload: "nextPageMySubGroupUsers"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}

