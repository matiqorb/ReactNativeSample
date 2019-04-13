import { TimeIntervalsSettingActions } from "../../helper/constants";
const timeIntervalsInit={
  items:[],
  editItem:null,
  status:[]
};

export const timeIntervals = (state = timeIntervalsInit, action) => {
  switch (action.type) {
    case TimeIntervalsSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case TimeIntervalsSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case TimeIntervalsSettingActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
    case TimeIntervalsSettingActions.Add:{
      return {
        ...state,
        items:state.items.concat(action.payload)
      };
    }
    case TimeIntervalsSettingActions.Update:{
      return {
        ...state,
        items:state.items.map(item=>item.id==action.payload.id?action.payload:item) 
      };
    }
    case TimeIntervalsSettingActions.Remove:{
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
        
      };
    }
    case TimeIntervalsSettingActions.LoadEditItem:{
      return {
        ...state,
        editItem:action.payload
        
      };
    }
    case TimeIntervalsSettingActions.EmptyEditItem:{
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
