import { WorkGroupSettingActions } from "../../helper/constants";
const shiftInit={
  items:[],
  editItem:null,
  status:[]
};

export const workGroups = (state = shiftInit, action) => {
  switch (action.type) {
    case WorkGroupSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case WorkGroupSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case WorkGroupSettingActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
    case WorkGroupSettingActions.Add:{
      return {
        ...state,
        items:state.items.concat(action.payload)
      };
    }
    case WorkGroupSettingActions.Update:{
      return {
        ...state,
        items:state.items.map(item=>item.id==action.payload.id?action.payload:item) 
      };
    }
    case WorkGroupSettingActions.Remove:{
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
        
      };
    }
    case WorkGroupSettingActions.LoadEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    case WorkGroupSettingActions.EmptyEditItem:{
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
