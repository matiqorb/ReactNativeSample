import request from "./requestService";

function getPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/userrequest/getPaged",
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
function getAllPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/userrequest/getAllPaged",
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
function addForgotten(model={date,time,description}){ //model is forgotten  
  return request(
    {
      url: "/api/v1/userrequest/addForgotten",
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
function addLeave(model={type,startDate,endDate,startTime,endTime,description}){ //model is leave  
  return request(
    {
      url: "/api/v1/userrequest/addLeave",
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
function addMission(model={type,startDate,endDate,startTime,endTime,description}){ //model is missiion  
  return request(
    {
      url: "/api/v1/userrequest/addMission",
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
      url: "/api/v1/userrequest/remove",
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
      url: "/api/v1/userrequest/getItem/"+id,
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
export default UserRequest = {
  getPaged,
  getAllPaged,
  addForgotten,
  addLeave,
  addMission,
  remove,
  getItem
};
