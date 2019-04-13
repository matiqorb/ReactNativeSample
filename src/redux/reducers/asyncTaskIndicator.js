import { AsyncTaskIndicatorActions } from "../../helper/constants";

export const asyncTaskIndicator=(state = [], action) =>{
  switch (action.type) {
    case AsyncTaskIndicatorActions.AddKey:
      return state.concat(action.payload);
    case AsyncTaskIndicatorActions.RemoveKey:
      return state.filter(attr => attr !== action.payload);
    default:
      return state;
  }
}
