import { UserEntryActions } from "../../helper/constants";
const usersEntryInit = {
  items: {},
  allUserItems:{},
  currentPage: 0,
  allUserCurrentPage:0,
  status: []
};

export const userEntries = (state = usersEntryInit, action) => {
  switch (action.type) {
    case UserEntryActions.AddStatusKey: {
      return {
        ...state,
        status: state.status.concat(action.payload)
      };
    }
    case UserEntryActions.RemoveStatusKey: {
      return {
        ...state,
        status: state.status.filter(item => item !== action.payload)
      };
    }
    case UserEntryActions.Refresh: {
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
    case UserEntryActions.NextPage: {
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
    case UserEntryActions.RefreshAllUsers: {
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
    case UserEntryActions.NextPageAllUsers: {
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
    case UserEntryActions.AddEntry: {
      return {
        ...state,
        items: {[action.payload.id]: action.payload,...state.items},
      };
    }
    case UserEntryActions.ReverseRemoveStatus: {
      let item={...state.allUserItems[action.payload]};
      item.isDeleted=!item.isDeleted;
      let newItems={...state.allUserItems};
      newItems[action.payload]= item;
      return {
        ...state,
        allUserItems:newItems
      };
    }
    default: {
      return state;
    }
  }
};
