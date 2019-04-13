import { SupervisorDashboardActions } from "../../helper/constants";
const supervisorDashboardInit = {
  allGroupUsers: {}, //contain all users where are in supervisor groups
  currentPage: 0, //allGroupUsers paging count
  totalUserStatus:{},// total user staus statistic like present,absent,leave,mission
  status: []
};

export const supervisorDashboard = (state = supervisorDashboardInit, action) => {
  switch (action.type) {
    case SupervisorDashboardActions.AddStatusKey: {
      return {
        ...state,
        status: state.status.concat(action.payload)
      };
    }
    case SupervisorDashboardActions.RemoveStatusKey: {
      return {
        ...state,
        status: state.status.filter(item => item !== action.payload)
      };
    }
    case SupervisorDashboardActions.RefreshAllSubGroupUsers: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.userId] = item;
        return obj;
      }, {});
      return {
        ...state,
        allGroupUsers: newItems,
        currentPage: 1
      };
    }
    case SupervisorDashboardActions.nextPageAllSubGroupUsers: {
      let newItems = action.payload.reduce(
        (obj, item) => {
          obj[item.userId] = item;
          return obj;
        },
        { ...state.allGroupUsers }
      );
      return {
        ...state,
        allGroupUsers: newItems,
        currentPage:
          action.payload.length > 0 ? state.currentPage + 1 : state.currentPage
      };
    }
    case SupervisorDashboardActions.RefreshTotalUserStatus: {
      return {
        ...state,
        totalUserStatus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
