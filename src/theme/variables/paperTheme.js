import { Platform } from 'react-native';
import { DefaultTheme,Colors } from "react-native-paper";
const iosBaseFontSize=12;
const androidBaseFontSize=14;
export default {
    ...DefaultTheme,
    fonts: {
    },
    colors:{
      ...DefaultTheme.colors,
      statusBarColor:Colors.deepPurple700,
      text:Colors.grey800,
      primary:Colors.deepPurple500,
      background:"white",
      success:Colors.green400,
      warning:Colors.yellow700,
      danger:Colors.redA200,
      listItemIcon:Colors.purple400,
      indicatorColor:Colors.purple400,
      fabsColor:Colors.deepPurple700,
      fabsIconColor:"white",
      refreshControlColors:[Colors.purple200,Colors.purple400],
      checkBoxColor:Colors.purple400,
      headerActionColor:Colors.grey200,
      headerActionIconColor:Colors.red500,
      placeHolderColor:Colors.grey500,
      hairlineColor:Colors.grey500,
    },
    inputStyle:{
      fontSize: Platform.OS ==='ios' ? iosBaseFontSize-1 : androidBaseFontSize-1,
    },
    titleStyle:{
        fontSize:Platform.OS === 'ios' ? iosBaseFontSize+1 : androidBaseFontSize+1,
    },
    subtitleStyle:{
        fontSize: Platform.OS === 'ios' ? iosBaseFontSize-4 :androidBaseFontSize-4,
    },
    fabs:{
      color:Colors.deepPurple700,
      fontSize:28
    },
    listItemStyle:{
      title:{
        fontSize:Platform.OS === 'ios' ? iosBaseFontSize : androidBaseFontSize,
      },
      subTitle:{
        fontSize:Platform.OS === 'ios' ? iosBaseFontSize-3 : androidBaseFontSize-3,
        color:Colors.grey700
      },
      listItem:{
        padding: 4
      }
    },
    spinner:{
      color:Colors.purple300,
      size:50,
      textStyle:{color:"white"}
    },
    badges:{
      warning:{
        backgroundColor: Colors.yellow200,
        borderRadius: 8
      },
      success:{
        backgroundColor: Colors.green200,
        borderRadius: 8
      },
      danger:{
        backgroundColor: Colors.red200,
        borderRadius: 8
      },
      default:{
        backgroundColor: Colors.grey200,
        borderRadius: 8
      }
    },
    refreshControlColors:[Colors.purple200,Colors.purple400],
    calendarTheme:{
      backgroundColor: "#ffffff",
      calendarBackground: "#ffffff",
      textSectionTitleColor: "#b6c1cd",
      selectedDayBackgroundColor: "#00adf5",
      selectedDayTextColor: "#ffffff",
      todayTextColor: "#00adf5",
      dayTextColor: "#2d4150",
      textDisabledColor: "#d9e1e8",
      dotColor: "#00adf5",
      selectedDotColor: "#ffffff",
      arrowColor: "orange",
      textMonthFontWeight: "bold",
      textDayFontSize: 14,
      textMonthFontSize: 15,
      textDayHeaderFontSize: 14
    }

  };