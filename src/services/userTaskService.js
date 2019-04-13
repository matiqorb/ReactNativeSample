import request from "./requestService";

function getPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/usertask/getPaged",
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
function changeStatus({id,status}={}){ //model is taskStatus 
  return request(
    {
      url: "/api/v1/usertask/changeStatus",
      method: "POST",
      data:{id,status}
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
      url: "/api/v1/usertask/getItem/"+id,
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
export default userTask = {
  getPaged,
  changeStatus,
  getItem
};
