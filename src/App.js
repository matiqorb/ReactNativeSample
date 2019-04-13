import React, { Component } from "react";
import {Animated,Easing,Platform} from "react-native"
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fa from "../node_modules/moment/locale/fa.js";

import Splash from "./screens/splash"
import Intro from "./screens/intro/";
import Register from "./screens/register";
import CodeActivate from "./screens/codeActivate";
import ClientType from "./screens/clientType";
import CreateBusiness from "./screens/createBusiness";
import Home from "./screens/home/";
import TenantSetting from "./screens/tenantSetting"
import AttendanceMethods from "./screens/attendanceMethods"
import WifiSignalList from "./screens/wifiSignalList"
import AddWifiSignal from "./screens/addWifiSignal"
import TimeIntervals from "./screens/timeIntervals"
import TimeIntervalsList from "./screens/timeIntervalsList"
import AddShift from "./screens/addShift"
import ShiftList from "./screens/shiftList"
import WorkGroupList from "./screens/workGroupList"
import AddWorkGroup from "./screens/addWorkGroup"
import AddCalendar from "./screens/addCalendar"
import CalendarList from "./screens/calendarList"
import UserList from "./screens/userList"
import AddUser from "./screens/addUser"
import GeneralSetting from "./screens/generalSetting"
import AddUserRequest from "./screens/addUserRequest"
import UserWorkTimeList from "./screens/userWorkTimeList"
import WorkTimeDetailScreen from "./screens/userWorkTimeList/workTimeDetailScreen"
import ReportItemsList from "./screens/reportItemsList"
import AllUserRequstList from "./screens/userRequest/allUserRequstList"
import UserRequestDetailScreen from "./screens/userRequest/userRequestDetailScreen"
import AllUserEntryList from "./screens/entryList/allUserEntryList"
import UserTaskDetailScreen from "./screens/userTask/userTaskDetailScreen"
import SupervisorDashboard from "./screens/supervisorDashboard"
import Profile from "./screens/profile"
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}

const APPStackNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    TenantSetting:{screen:TenantSetting},
    AttendanceMethods:{screen:AttendanceMethods},
    WifiSignalList:{screen:WifiSignalList},
    AddWifiSignal:{screen:AddWifiSignal},
    TimeIntervals:{screen:TimeIntervals},
    TimeIntervalsList:{screen:TimeIntervalsList},
    AddShift:{screen:AddShift},
    ShiftList:{screen:ShiftList},
    WorkGroupList:{screen:WorkGroupList},
    AddWorkGroup:{screen:AddWorkGroup},
    AddCalendar:{screen:AddCalendar},
    CalendarList:{screen:CalendarList},
    UserList:{screen:UserList},
    AddUser:{screen:AddUser},
    GeneralSetting:{screen:GeneralSetting},
    AddUserRequest:{screen:AddUserRequest},
    UserWorkTimeList:{screen:UserWorkTimeList},
    WorkTimeDetailScreen:{screen:WorkTimeDetailScreen},
    ReportItemsList:{screen:ReportItemsList},
    AllUserRequstList:{screen:AllUserRequstList},
    UserRequestDetailScreen:{screen:UserRequestDetailScreen},
    AllUserEntryList:{screen:AllUserEntryList},
    UserTaskDetailScreen:{screen:UserTaskDetailScreen},
    SupervisorDashboard:{screen:SupervisorDashboard},
    Profile:{screen:Profile}
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    transitionConfig:transitionConfig,
    mode: Platform.OS === "ios" ? "modal" : "card",
  
  }
);

const RegisterStackNavigator = createStackNavigator(
  {
    clientType: { screen: ClientType },
    CreateBusiness: { screen: CreateBusiness },
  },
  {
    initialRouteName: "clientType",
    headerMode: "none"
  }
);
const AppNavigator = createSwitchNavigator(
  {
    Splash:{screen:Splash},
    //Drawer: { screen: Drawer },
    Intro: Intro,
    Register: Register,
    CodeActivate: CodeActivate,
    ClientType: RegisterStackNavigator,
    AppStart: APPStackNavigator
  },
  {
    initialRouteName:"Splash", //this.initialRouteName(),
    mode:"card"
  }
);
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady:false
    };
 
    
  }
  async componentWillMount(){
   
  }
  async componentDidMount() {
   
  }
  
  render() {
    console.log('====================================');
    console.log("App.js is rendering..............");
    console.log('====================================');
   
    return (
      <AppNavigator />
    );
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    
  }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
