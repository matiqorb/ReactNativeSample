import { UserRequestActions } from "../../helper/constants";
const shiftInit = {
  items: [],
  allUserItems: {},
  currentPage: 0,
  allUserCurrentPage: 0,
  status: []
};

export const userRequests = (state = shiftInit, action) => {
  switch (action.type) {
    case UserRequestActions.AddStatusKey: {
      return {
        ...state,
        status: state.status.concat(action.payload)
      };
    }
    case UserRequestActions.RemoveStatusKey: {
      return {
        ...state,
        status: state.status.filter(item => item !== action.payload)
      };
    }
    case UserRequestActions.Refresh: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
      return {
        ...state,
        items: newItems,
        currentPage: 1
      };
    }
    case UserRequestActions.NextPage: {
      let newItems = action.payload.reduce(
        (obj, item) => {
          obj[item.id] = item;
          return obj;
        },
        { ...state.items }
      );
      return {
        ...state,
        items: newItems,
        currentPage:
          action.payload.length > 0 ? state.currentPage + 1 : state.currentPage
      };
    }
    case UserRequestActions.RefreshAllUsers: {
      let newItems = action.payload.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
      return {
        ...state,
        allUserItems: newItems,
        allUserCurrentPage: 1
      };
    }
    case UserRequestActions.NextPageAllUsers: {
      let newItems = action.payload.reduce(
        (obj, item) => {
          obj[item.id] = item;
          return obj;
        },
        { ...state.allUserItems }
      );
      return {
        ...state,
        allUserItems: newItems,
        allUserCurrentPage:
          action.payload.length > 0
            ? state.allUserCurrentPage + 1
            : state.allUserCurrentPage
      };
    }
    case UserRequestActions.Add: {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    }
    default: {
      return state;
    }
  }
};
