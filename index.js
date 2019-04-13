/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { I18nManager } from "react-native";
import {
  setJSExceptionHandler,
  getJSExceptionHandler
} from "react-native-exception-handler";
import firebase from "react-native-firebase";
if (__DEV__) {
    require('react-devtools');
}

const applicationExceptionhandler = (error, isFatal) => {
  const crashlytics = firebase.crashlytics()
  setTimeout(() => {
    if (error instanceof Error) {
      
      crashlytics.setStringValue("stack", `${error.stack}`);
      crashlytics.recordError(0, `RN Fatal: ${error.message}`);
    } else {
      // Have never gotten this log so far. Might not be necessary.
      crashlytics.recordError(0, `RN Fatal: ${error}`);
    }
  }, 0);
 
  return false;
};
setJSExceptionHandler(applicationExceptionhandler, false);

I18nManager.forceRTL(true);
AppRegistry.registerComponent(appName, () => App);
