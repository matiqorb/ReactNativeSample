import request from "./requestService";

function getMySubGroupUsersPaged({pageSize,pageCount,filter}){ 
  return request(
    {
      url: "/api/v1/supervisor/getMySubGroupUsersPaged",
      method: "POST",
      data:{pageSize,pageCount,filter}
    },
    true
  )
    .then(response => {
      console.log("response:",response);
      
      return response;
    }).catch(error=>{
      return Promise.reject(error);
    });
}

export default SupervisorDashboardService = {
  getMySubGroupUsersPaged,
 
};
