import React, { Component } from "react";
import material from "../theme/variables/material";
import { TextField } from "react-native-material-textfield";
import { withTheme } from "react-native-paper";
export function ReduxTextInput({ input, label, type, meta, ...props }) {
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
  console.log("ReduxTextInput input:", { ...props });
  if (
    (error !== undefined && !active && dirty) ||
    (submitFailed && error !== undefined)
  ) {
    hasError = true;
  }
  const { hideIcon, theme } = props;
  return (
    <TextField
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
      errorColor={theme.colors.danger}
      {...input}
      {...props.inputProps}
      error={hasError ? (error == "" ? " " : error) : ""}
    />
  );
}
export default withTheme(ReduxTextInput);
