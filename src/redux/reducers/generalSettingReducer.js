import { GeneralSettingActions } from "../../helper/constants";
const generalSettingInit={
  model:null,
  status:[]
};

export const generalSetting = (state = generalSettingInit, action) => {
  switch (action.type) {
    case GeneralSettingActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case GeneralSettingActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case GeneralSettingActions.Refresh:{
      return {
        ...state,
        model:action.payload
      };
    }
   
    case GeneralSettingActions.Update:{
      return {
        ...state,
        model:action.payload
      };
    }
    default:{
      return state;
    }
  }
};
