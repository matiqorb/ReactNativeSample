import { ShiftSettingActions } from "../../helper/constants";
const shiftInit={
  items:[],
  editItem:null,
  status:[]
};

export const shifts = (state = shiftInit, action) => {
  switch (action.type) {
    case ShiftSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case ShiftSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case ShiftSettingActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
    case ShiftSettingActions.Add:{
      return {
        ...state,
        items:state.items.concat(action.payload)
      };
    }
    case ShiftSettingActions.Update:{
      return {
        ...state,
        items:state.items.map(item=>item.id==action.payload.id?action.payload:item) 
      };
    }
    case ShiftSettingActions.Remove:{
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
        
      };
    }
    case ShiftSettingActions.LoadEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    case ShiftSettingActions.EmptyEditItem:{
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
