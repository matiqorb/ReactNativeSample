import * as React from "react";
import { ScrollView } from "react-native";
import { withTheme } from 'react-native-paper';

function Content(props) {
  const { children, style } = props;
  //const { colors } = props.theme;
  return (<ScrollView contentContainerStyle={[{ paddingHorizontal: 8 },{...props.contentContainerStyle}]} {...props} >
    {children}
  </ScrollView>)

}

export default withTheme(Content);