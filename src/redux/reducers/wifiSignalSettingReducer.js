import { WifiSignalActions } from "../../helper/constants";
const initWifiSignals={
  availableWifis:[],
  wifiList:[], //key object wifi array
  status:[],
  wifiIndicator:[], //is just for client to authorize them {name,mac,minStrength}
  lastScanTime:null

};

export const wifiSignalSetting = (state = initWifiSignals, action) => {
  switch (action.type) {
    case WifiSignalActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case WifiSignalActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case WifiSignalActions.refreshAvailableWifis:{
      return {
        ...state,
        availableWifis:action.payload,
        lastScanTime:new Date()
      };
    }
    case WifiSignalActions.initWifis:{
      return {
        ...state,
        wifiList:action.payload
      };
    }
    case WifiSignalActions.Add:{
        return {
          ...state,
          wifiList:state.wifiList.concat(action.payload)
        };
      }
    case WifiSignalActions.Remove:{
        return {
          ...state,
          wifiList:state.wifiList.filter((item)=>!action.payload.includes(item.id))
        };
      }
      case WifiSignalActions.SyncWifiIndicator:{
        return {
          ...state,
          wifiIndicator:action.payload
        };
      }
    default:{
      return state;
    }
  }
};
