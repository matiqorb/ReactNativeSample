import dbContext, { Domains } from "../../database/dbContext";
import {
  GeneralSettingActions
} from "../../helper/constants";
import settingSerive from "../../services/settingService";

export function refresh() {
  return (dispatch, getState) => {
    dispatch({
      type: GeneralSettingActions.AddStatusKey,
      payload: "refresh"
    });
   return settingSerive.getGeneralSetting()
      .then(response => {
        dispatch({
          type: GeneralSettingActions.Refresh,
          payload: response
        });
        dispatch({
          type: GeneralSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
      })
      .catch(error => {
        dispatch({
          type: GeneralSettingActions.RemoveStatusKey,
          payload: "refresh"
        });
        console.log(error);
        Promise.reject(error);
      });
  };
}
export function update(model) {
  return (dispatch, getState) => {
    dispatch({
      type: GeneralSettingActions.AddStatusKey,
      payload: "update"
    });
    return settingSerive.updateGeneralSetting(model)
      .then(response => {
        if (model.id) {
          dispatch({
            type: GeneralSettingActions.Update,
            payload: response
          });
        } else
          dispatch({
            type: GeneralSettingActions.Add,
            payload: response
          });

        dispatch({
          type: GeneralSettingActions.RemoveStatusKey,
          payload: "update"
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GeneralSettingActions.RemoveStatusKey,
          payload: "update"
        });
        Promise.reject(error);
      });
  };
}
