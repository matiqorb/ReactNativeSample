import dbContext, { Domains } from "../../database/dbContext";
import { UserProfileActions } from "../../helper/constants";
import { UserProfileService } from "../../services/userProfileService";
export function load() {
    return (dispatch, getState) => {
      return UserProfileService.get()
        .then(response => {
          dispatch({
            type: UserProfileActions.Load,
            payload: response
          });
          return response;
        })
        .catch(error => {
          console.log(error);
          Promise.reject(error);
        });
    };
 
}
export function updateUserProfile(userProfile) {
  try {
    UserProfileService.update(userProfile);
    return {
      type: UserProfileActions.Update,
      payload: userProfile
    };
  } catch (e) {
    console.log(`updateUserProfile:
        ${e}`);
  }
  return {
    type: UserProfileActions.NoThing
  };
}
export function syncProfileFromCloud() {
  return (dispatch, getState) => {
    return UserProfileService.getFromCloud()
      .then(response => {
        dispatch(updateUserProfile(response));
        return;
      })
      .catch(error => {
        console.log(error);
        return;
      });
  };
}
