import { AsyncTaskIndicatorActions } from "../../helper/constants";

export function addAsyncTaskIndicator(taskName) {
  return {
    type: AsyncTaskIndicatorActions.AddKey,
    payload: taskName
  }
}

export function removeAsyncTaskIndicator(taskName) {
  return {
    type: AsyncTaskIndicatorActions.RemoveKey,
    payload: taskName
  }
}