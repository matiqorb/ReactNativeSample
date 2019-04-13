import request from "./requestService";

function getPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/workgroup/getPaged",
      method: "POST",
      data:{pageSize,pageCount}
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}
function update(model){ //model is shift 
  return request(
    {
      url: "/api/v1/workgroup/update",
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
function remove(model){ //model is shift 
  return request(
    {
      url: "/api/v1/workgroup/remove",
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
function getItem(id){ //model is shift 
  return request(
    {
      url: "/api/v1/workgroup/getItem/"+id,
      method: "GET",
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}
export default workGroupService = {
  getPaged,
  update,
  remove,
  getItem
};
