import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import {withTheme} from "react-native-paper"
function ReduxDropdown({ input, label, type, meta,theme, ...props }) {
  var hasError = false;
  const {
    active,
    asyncValidating,
    autofilled,
    dirty,
    dispatch,
    error,
    form,
    initial,
    invalid,
    pristine,
    submitFailed,
    submitting,
    touched,
    valid,
    visited,
    warning
  } = meta;
  if (
    (error !== undefined && !active && dirty) ||
    (submitFailed && error !== undefined)
  ) {
    hasError = true;
  }
  const { hideIcon } = props;
  return (
    <Dropdown
      useNativeDriver={true}
      fontSize={theme.inputStyle.fontSize + 2}
      style={{
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
        fontSize: theme.inputStyle.fontSize
      }}
      labelTextStyle={{
        fontFamily: theme.fonts.regular
      }}
      titleTextStyle={{
        fontFamily: theme.fonts.regular,
        fontSize: theme.subtitleStyle.fontSize
      }}
      affixTextStyle={{
        fontFamily: theme.fonts.regular,
        fontSize: theme.subtitleStyle.fontSize
      }}
      tintColor={theme.colors.primary}
      itemTextStyle={{ fontFamily:  theme.fonts.regular,color: theme.colors.text, }}
      //pickerStyle={}
      errorColor={theme.colors.danger}
      {...input}
      {...props.inputProps}
      error={hasError ? (error == "" ? " " : error) : ""}
      onChangeText={value => {
        input.onChange(value);
      }}
    />
  );
}
export default withTheme(ReduxDropdown)