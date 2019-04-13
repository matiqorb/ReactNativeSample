import React, { Component } from "react";
import { View,StyleSheet } from "react-native";
import { Checkbox, Text, withTheme } from "react-native-paper";
import material from "../theme/variables/material";

export class ReduxCheckBoxInput extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      checked: false
    };
  }
 

  render() {
    const { input, label, type, meta, ...props } = this.props;
    let hasError = false;
    const {
      active,
      dirty,
      error,
      submitFailed
    } = meta;

    if (
      (error !== undefined && !active && dirty) ||
      (submitFailed && error !== undefined)
    ) {
      hasError = true;
    }
    const { theme } = props;
    const { checked } = this.state;
    return (
      <View
        style=
        {{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingTop: 20,
          paddingBottom: 8,
          marginBottom: 8,
          alignItems: "center",
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colors.hairlineColor
        }}
        >
        <Checkbox
          color={theme.colors.checkBoxColor}
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            this.setState({ checked: !checked }, () => {
              input.onChange(this.state.checked);
            });
          }}
        />
        <Text
          onPress={() => {
            this.setState({ checked: !checked }, () => {
              input.onChange(this.state.checked);
            });
          }}
          style={{
            fontFamily: theme.fonts.regular,
            color: theme.colors.placeHolderColor,
            fontSize: theme.inputStyle.fontSize + 2
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
}
export default withTheme(ReduxCheckBoxInput);
