import { CalendarSettingActions } from "../../helper/constants";
const calendarsInit={
  items:[],
  editItem:null,
  status:[]
};

export const calendars = (state = calendarsInit, action) => {
  switch (action.type) {
    case CalendarSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case CalendarSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case CalendarSettingActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
    case CalendarSettingActions.Add:{
      return {
        ...state,
        items:state.items.concat(action.payload)
      };
    }
    case CalendarSettingActions.Update:{
      return {
        ...state,
        items:state.items.map(item=>item.id==action.payload.id?action.payload:item) 
      };
    }
    case CalendarSettingActions.Remove:{
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
        
      };
    }
    case CalendarSettingActions.LoadEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    case CalendarSettingActions.EmptyEditItem:{
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
