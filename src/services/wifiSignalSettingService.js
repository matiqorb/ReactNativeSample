import request from "./requestService";
import { asyncDbContext, Domains } from "../database/dbContext"

function getCloudWifi() {
  return request(
    {
      url: "/api/v1/WifiSignalSetting/GetWifis",
      method: "GET"
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error => {
      return Promise.reject(error);
    });
}
function addWifiSignals(model) { //model is array of wifi signals
  return request(
    {
      url: "/api/v1/WifiSignalSetting/AddWifiSignals",
      method: "POST",
      data: model
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error => {
      return Promise.reject(error);
    });
}
function removeWifiSignals(model) { //model is array of wifi signal ids
  return request(
    {
      url: "/api/v1/WifiSignalSetting/RemoveWifiSignals",
      method: "POST",
      data: model
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error => {
      return Promise.reject(error);
    });
}
function updateLocalWifiIndicators(model) { //model is array of wifi signal ids
  return asyncDbContext().then(realm => {
    realm.write(() => {
      let allIndicators = realm.objects(Domains.WifiIndicator);
      realm.delete(allIndicators);
      model.forEach(obj => {
        realm.create(Domains.WifiIndicator, {
          SSID: obj.SSID,
          MAC:obj.MAC,
          RSSI:obj.RSSI
        });
      });
      return;
    })
    realm.close();
  }).catch(error => {
    return Promise.reject(error);
  });
}
function getLocalWifiIndicators() { //model is array of wifi signal ids
  return asyncDbContext().then(realm => {
    let allIndicators = realm.objects(Domains.WifiIndicator);
    let result=allIndicators.map(indicator=>({...indicator}));
    realm.close();
    return result;
  }).catch(error => {
    return Promise.reject(error);
  });
}
export default WifiSignalSettingService = {
  getCloudWifi,
  addWifiSignals,
  removeWifiSignals,
  updateLocalWifiIndicators,
  getLocalWifiIndicators
};
