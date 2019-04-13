import { UserProfileActions } from "../../helper/constants";
//import { UserProfileService } from "../../services/userProfileService";
const initProfile=null

export const userProfile = (state = initProfile, action) => {
  switch (action.type) {
    case UserProfileActions.Load:{
      return {
        ...state,
        ...action.payload
      };
    }
    case UserProfileActions.Update:{
        return {
          ...state,
          ...action.payload
        };
      }
    default:{
      return state;
    }
  }
};
