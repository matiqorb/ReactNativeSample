const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

import { Colors } from "react-native-paper";

export default {
    container:{ backgroundColor: Colors.grey200 },
    forgottenDescContainer:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    dateContainer:{
      flex:0,
      flexDirection: 'row',
      marginEnd:10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    caption:{
      paddingTop: 3,
      paddingRight: 3
    },
    footerComponent:{
      padding:  10
    }
};
