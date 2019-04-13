import { UsersSettingActions } from "../../helper/constants";
const usersInit={
  items:[],
  editItem:null,
  status:[]
};

export const users = (state = usersInit, action) => {
  switch (action.type) {
    case UsersSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case UsersSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case UsersSettingActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
    case UsersSettingActions.Add:{
      return {
        ...state,
        items:state.items.concat(action.payload)
      };
    }
    case UsersSettingActions.Update:{
      return {
        ...state,
        items:state.items.map(item=>item.id==action.payload.id?action.payload:item) 
      };
    }
    case UsersSettingActions.Remove:{
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
        
      };
    }
    case UsersSettingActions.LoadEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    case UsersSettingActions.EmptyEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    default:{
      return state;
    }
  }
};
