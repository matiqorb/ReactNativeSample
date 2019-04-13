import request from "./requestService";

function getGeneralSetting(){ //model is shift 
  return request(
    {
      url: "/api/v1/setting/getGeneralSetting",
      method: "GET"
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}
function updateGeneralSetting(model){ //model is shift 
  return request(
    {
      url: "/api/v1/setting/updateGeneralSetting",
      method: "POST",
      data:model
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}

export default SettingService = {
  getGeneralSetting,
  updateGeneralSetting
};
