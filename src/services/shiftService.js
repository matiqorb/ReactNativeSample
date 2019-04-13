import request from "./requestService";

function getPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/shift/getPaged",
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
      url: "/api/v1/shift/update",
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
      url: "/api/v1/shift/remove",
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
      url: "/api/v1/shift/getItem/"+id,
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
export default ShiftService = {
  getPaged,
  update,
  remove,
  getItem
};
