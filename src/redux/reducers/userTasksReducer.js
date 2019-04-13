import { UserTaskActions } from "../../helper/constants";
const taskInit={
  items:[],
  itemDetail:null,
  status:[]
};

export const userTasks = (state = taskInit, action) => {
  switch (action.type) {
    case UserTaskActions.AddStatusKey:{
      return {
        ...state,
        status:state.status.concat(action.payload)
      };
    }
    case UserTaskActions.RemoveStatusKey:{
      return {
        ...state,
        status:state.status.filter(item=>item !== action.payload)
      };
    }
    case UserTaskActions.Refresh:{
      return {
        ...state,
        items:action.payload
      };
    }
   
    case UserTaskActions.ChangeStatus:{
      
      return {
        ...state,
        items:state.items.filter(item=>!action.payload.includes(item.id)) 
      };
    }
    
    case UserTaskActions.LoadItemDetail:{
      return {
        ...state,
        itemDetail:action.payload
        
      };
    }
    case UserTaskActions.EmptyItemDetail:{
      return {
        ...state,
        itemDetail:action.payload
        
      };
    }
    default:{
      return state;
    }
  }
};
