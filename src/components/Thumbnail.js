import * as React from "react";
import { Image } from "react-native";
import { withTheme } from 'react-native-paper';

function Thumbnail(props) {
  const { square , source, style ,size=60 ,defaultSource} = props;
  return (<Image source={source} defaultSource={defaultSource} style={[{width: size,height:size, borderRadius:square?0:size/2},style]}/>)

}

export default withTheme(Thumbnail);
