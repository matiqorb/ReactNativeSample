import React, { Component } from "react";
import {StatusBar} from "react-native"
import {
  DefaultTheme,
  Colors,
  Provider as PaperProvider
} from "react-native-paper";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

import store from "../redux/store";

import App from "../App";
import theme from "../theme/variables/paperTheme";

export class Setup extends Component {
  constructor(props) {
    super(props);
    if (!I18nManager.isRTL) RNRestart.Restart();

  }
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <MenuProvider>
            <StatusBar  backgroundColor={theme.colors.statusBarColor} barStyle='light-content' />
            <App />
          </MenuProvider>
        </PaperProvider>
      </Provider>
    );
  }
}


export default Setup;
