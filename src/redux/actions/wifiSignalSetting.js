import { PermissionsAndroid } from "react-native";
import WifiSignalSettingService from "../../services/wifiSignalSettingService";
import {
  addAsyncTaskIndicator,
  removeAsyncTaskIndicator
} from "../actions/asyncTaskIndicator";
import { WifiSignalActions } from "../../helper/constants";
import wifi from "react-native-android-wifi";

export function getCloudWifi() {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "getCloudWifi"
    });
    return WifiSignalSettingService.getCloudWifi()
      .then(response => {
        dispatch({
          type: WifiSignalActions.initWifis,
          payload: response
        });
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "getCloudWifi"
        });
      })
      .catch(error => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "getCloudWifi"
        });
        console.log(error);
      });
  };
}
export function syncWifiIndicators() {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "syncWifiIndicators"
    });
    return WifiSignalSettingService.getCloudWifi()
      .then(response => {
        WifiSignalSettingService.updateLocalWifiIndicators(response).then(() => {
          dispatch({
            type: WifiSignalActions.SyncWifiIndicator,
            payload: response
          });
          dispatch({
            type: WifiSignalActions.RemoveStatusKey,
            payload: "syncWifiIndicators"
          });
        }).catch(error => {
          dispatch({
            type: WifiSignalActions.RemoveStatusKey,
            payload: "syncWifiIndicators"
          });
          console.log(error);
        });

      })
      .catch(error => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "syncWifiIndicators"
        });
        console.log(error);
      });
  };
}
export function loadLocalWifiIndicators() {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "loadLocalWifiIndicators"
    });
    return WifiSignalSettingService.getLocalWifiIndicators().then((response) => {
      dispatch({
        type: WifiSignalActions.SyncWifiIndicator,
        payload: response
      });
      dispatch({
        type: WifiSignalActions.RemoveStatusKey,
        payload: "loadLocalWifiIndicators"
      });
    }).catch(error => {
      dispatch({
        type: WifiSignalActions.RemoveStatusKey,
        payload: "loadLocalWifiIndicators"
      });
      console.log(error);
    });
  };
}
export function refreshAvailableWifis() {
  return async (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "refreshAvailableWifis"
    });
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "اتصال به شبکه",
        message: "جهت نمایش لیست سیگنال های وای فای به مجوز شما نیاز است"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Thank you for your permission! :)");
    } else {
      dispatch({
        type: WifiSignalActions.RemoveStatusKey,
        payload: "refreshAvailableWifis"
      });
      console.log("You will not able to retrieve wifi available networks list");
      return;
    }

    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        wifi.reScanAndLoadWifiList(
          wifiStringList => {
            var wifiArray = JSON.parse(wifiStringList);
            wifiArray.sort((item1, item2) => item2.level - item1.level);
            dispatch({
              type: WifiSignalActions.refreshAvailableWifis,
              payload: wifiArray
            });
            dispatch({
              type: WifiSignalActions.RemoveStatusKey,
              payload: "refreshAvailableWifis"
            });
          },
          error => {
            console.log(error);
            dispatch({
              type: WifiSignalActions.RemoveStatusKey,
              payload: "refreshAvailableWifis"
            });
          }
        );
        // wifi.loadWifiList(
        //   wifiStringList => {
        //     var wifiArray = JSON.parse(wifiStringList);
        //    this.setState({wifiList:wifiArray, refreshing: false});
        //   },
        //   error => {
        //     console.log(error);
        //     Promise.reject(error);
        //   }
        // );
      } else {
        console.log("wifi service is disabled");
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "refreshAvailableWifis"
        });
      }
    });
  };
}
export function addWifiSignals(model) {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "addWifiSignals"
    });
    return WifiSignalSettingService.addWifiSignals(model)
      .then(response => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "addWifiSignals"
        });
        dispatch({
          type: WifiSignalActions.Add,
          payload: response //response is array of wifi model
        });
        Promise.resolve();
      })
      .catch(error => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "addWifiSignals"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function removeWifiSignals(model) {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "removeWifiSignals"
    });
    return WifiSignalSettingService.removeWifiSignals(model)
      .then(response => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "removeWifiSignals"
        });
        dispatch({
          type: WifiSignalActions.Remove,
          payload: response //response is array of ids
        });
        return;
      })
      .catch(error => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "removeWifiSignals"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function changeDefaultMethod(defaultMethod) {
  return (dispatch, getState) => {
    dispatch({
      type: WifiSignalActions.AddStatusKey,
      payload: "changeDefaultMethod"
    });
    return MethodSettingService.changeDefaultMethod(defaultMethod)
      .then(response => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "changeDefaultMethod"
        });
        return response;
      })
      .catch(error => {
        dispatch({
          type: WifiSignalActions.RemoveStatusKey,
          payload: "changeDefaultMethod"
        });
        return Promise.reject(error);
      });
  };
}
