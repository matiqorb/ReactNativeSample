import { AuthenticationService } from "../../services/authenticationService";
import { AsyncTaskIndicatorActions } from "../../helper/constants";
import { updateUserProfile } from "./userProfile";
export function requestSMSCode(phoneNumber) {
  return (dispatch, getState) => {
    const state=getState();
    dispatch({
      type: AsyncTaskIndicatorActions.AddKey,
      payload: "requestSMSCode"
    });
    return AuthenticationService.requestSMSCode(phoneNumber,state.userProfile.IMEI)
      .then(response => {
        dispatch({
          type: AsyncTaskIndicatorActions.RemoveKey,
          payload: "requestSMSCode"
        });
        dispatch(updateUserProfile({ phoneNumber: phoneNumber }));
        console.log(response);
        return true;
      })
      .catch(error => {
        dispatch({
          type: AsyncTaskIndicatorActions.RemoveKey,
          payload: "requestSMSCode"
        });

        console.log(error);
        return false;
      });
  };
}
export function verifyActivationCode(phoneNumber, activationCode) {
  return (dispatch, getState) => {
    const state=getState();
    dispatch({
      type: AsyncTaskIndicatorActions.AddKey,
      payload: "verifyActivationCode"
    });
    return AuthenticationService.verifyActivationCode(
      phoneNumber,
      activationCode,
      state.userProfile.IMEI
    )
      .then(response => {
       
        
        if(response && response.password){
          updateUserProfile({
            activationCode: activationCode,
            firstName:response.firstName,
            lastName:response.lastName,
            position:response.position,
            companyName:response.companyName,
            password:response.password,
            tenantId:response.tenantId,
            registerDate:response.registerDate
          })
          return AuthenticationService.getToken(
            response.username,
            response.password,
            response.tenantId
          )
            .then(response => {
              dispatch(
                updateUserProfile({
                  token:JSON.stringify(response)
                })
              );
              dispatch({
                type: AsyncTaskIndicatorActions.RemoveKey,
                payload: "verifyActivationCode"
              });
              return true;
            })
            .catch(error => {
              console.log(error);
              dispatch({
                type: AsyncTaskIndicatorActions.RemoveKey,
                payload: "verifyActivationCode"
              });
              return false;
            });
        }else{
          dispatch(updateUserProfile({ activationCode: activationCode }));
          dispatch({
            type: AsyncTaskIndicatorActions.RemoveKey,
            payload: "verifyActivationCode"
          });
          return true;
        }
      })
      .catch(error => {
        dispatch({
          type: AsyncTaskIndicatorActions.RemoveKey,
          payload: "verifyActivationCode"
        });

        console.log(error);
        return false;
      });
  };
}
export function registerTenant(
  model = {
    firstName,
    LastName,
    position,
    companyName,
    defaultMethod
  }
) {
  return (dispatch, getState) => {
    const state=getState();
    
    dispatch({
      type: AsyncTaskIndicatorActions.AddKey,
      payload: "registerTenant"
    });
    return AuthenticationService.registerTenant(
      state.userProfile.phoneNumber,
      state.userProfile.activationCode,
      state.userProfile.IMEI,
      model.firstName,
      model.lastName,
      model.position,
      model.companyName,
      model.defaultMethod
    )
      .then(response => {
        dispatch(
          updateUserProfile({
            ...model,
            password: response.password,
            tenantId: response.tenantId,
            registerDate:response.registerDate
          })
        );
        console.log(response);
        return AuthenticationService.getToken(
          response.username,
          response.password,
          response.tenantId
        )
          .then(response => {
            dispatch(
              updateUserProfile({
                token:JSON.stringify(response)
              })
            );
            dispatch({
              type: AsyncTaskIndicatorActions.RemoveKey,
              payload: "registerTenant"
            });
            return true;
          })
          .catch(error => {
            dispatch({
              type: AsyncTaskIndicatorActions.RemoveKey,
              payload: "registerTenant"
            });
            console.log(error);
            return false;
          });
      })
      .catch(error => {
        dispatch({
          type: AsyncTaskIndicatorActions.RemoveKey,
          payload: "registerTenant"
        });

        console.log(error);
        return false;
      });
  };
}
