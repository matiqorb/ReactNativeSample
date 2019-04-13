import request from "./requestService";

function getPaged({pageSize,pageCount}={}){ //model is shift 
  return request(
    {
      url: "/api/v1/calendar/getPaged",
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
      url: "/api/v1/calendar/update",
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
      url: "/api/v1/calendar/remove",
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
      url: "/api/v1/calendar/getItem/"+id,
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
function getHolidays(model){ //model is date string 
  return request(
    {
      url: "/api/v1/calendar/getHolidays",
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
function addHoliday(model){ 
  return request(
    {
      url: "/api/v1/calendar/addHoliday",
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
function deleteHoliday(model){ 
  return request(
    {
      url: "/api/v1/calendar/deleteHoliday",
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
export default CalendarService = {
  getPaged,
  update,
  remove,
  getItem,
  getHolidays,
  addHoliday,
  deleteHoliday
};
