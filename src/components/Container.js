import * as React from "react";
import { View } from "react-native";
import { withTheme } from 'react-native-paper';

function Container(props) {
  const { children,style } = props;
  const {colors}=props.theme;
  return <View {...props} style={{ flex: 1,backgroundColor: colors.surface ,...style}} >{children}</View>;
}

export default withTheme(Container);