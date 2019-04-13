import { UserWorkTimeActions } from "../../helper/constants";
const userWorktimeInit = {
  items: {},
  allUserItems:{},
  currentPage: 0,
  allUserCurrentPage:0,
  status: []
};

export const userWorkTimes = (state = userWorktimeInit, action) => {
  switch (action.type) {
    case UserWorkTimeActions.AddStatusKey: {
      return {
        ...state,
        status: state.status.concat(action.payload)
      };
    }
    case UserWorkTimeActions.RemoveStatusKey: {
      return {
        ...state,
        status: state.status.filter(item => item !== action.payload)
      };
    }
    case UserWorkTimeActions.Refresh: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id]=item;
        return obj;
      }, {});
      return {
        ...state,
        items: newItems,
        currentPage:1
      };
    }
    case UserWorkTimeActions.NextPage: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id]=item;
        return obj;
      }, {...state.items});
      return {
        ...state,
        items: newItems,
        currentPage:action.payload.length>0?state.currentPage+1:state.currentPage
      };
    }
    case UserWorkTimeActions.RefreshAllUsers: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id]=item;
        return obj;
      }, {});
      return {
        ...state,
        allUserItems: newItems,
        allUserCurrentPage:1
      };
    }
    case UserWorkTimeActions.NextPageAllUsers: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id]=item;
        return obj;
      }, {...state.allUserItems});
      return {
        ...state,
        allUserItems: newItems,
        allUserCurrentPage:action.payload.length>0?state.allUserCurrentPage+1:state.allUserCurrentPage
      };
    }
    case UserWorkTimeActions.EmptyUserWorkTime: {
     
      return {
        ...state,
        items: {},
        currentPage:0
      };
    }
    default: {
      return state;
    }
  }
};
