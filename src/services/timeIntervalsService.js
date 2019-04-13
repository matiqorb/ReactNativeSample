import request from "./requestService";

function getPaged({pageSize,pageCount}){ //model is time interval 
  return request(
    {
      url: "/api/v1/timeIntervals/getPaged",
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
function update(model){ //model is time interval 
  return request(
    {
      url: "/api/v1/timeIntervals/update",
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
function remove(model){ //model is time interval 
  return request(
    {
      url: "/api/v1/timeIntervals/remove",
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
function getItem(id){ //model is time interval 
  return request(
    {
      url: "/api/v1/timeIntervals/getItem/"+id,
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
export default TimeIntervalsService = {
  getPaged,
  update,
  remove,
  getItem
};
