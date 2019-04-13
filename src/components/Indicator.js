import * as React from "react";
import { withTheme } from 'react-native-paper';
import { SkypeIndicator } from "react-native-indicators";
function Indicator(props) {
  const { style,theme } = props;
  return <SkypeIndicator color={theme.colors.fabsIconColor} {...props}  style={style} />;
}
export default withTheme(Indicator);