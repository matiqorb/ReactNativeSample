import request from "./requestService";

function getPaged({pageSize,pageCount,filterType}={}){ 
  return request(
    {
      url: "/api/v1/userworktime/getPaged",
      method: "POST",
      data:{pageSize,pageCount,filterType}
    },
    true
  )
    .then(response => {
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}
function getAllPaged({pageSize,pageCount}={}){ 
  return request(
    {
      url: "/api/v1/userworktime/getAllPaged",
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

export default UserWorkTime = {
  getPaged,
  getAllPaged,
};
