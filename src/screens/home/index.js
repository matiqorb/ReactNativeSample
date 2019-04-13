import React, { Component } from "react";
import { ImageBackground, View, StatusBar, ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./styles";
import { BottomNavigation, Text } from "react-native-paper";
import {loadLocalWifiIndicators,syncWifiIndicators} from "../../redux/actions/wifiSignalSetting"

import Profile from "../profile";
import AddEntry from "../addEntry";

import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import UserRequest from "../userRequest";
import UserTask from "../userTask";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "profile", title: "", icon: "person" },
        { key: "enroll", title: "" , icon: "fingerprint" },
        { key: "userRequest", title: " ", icon: "playlist-add" },
        { key: "userTask", title: "", icon: "assignment" }
      ]
    };
    this.counter = 0;
  }
  componentWillMount(){
    this.props.syncWifiIndicators();
  }
  componentDidMount() {
  }
  _handleIndexChange = index => this.setState({ index });
  renderScene = ({ route, jumpTo }) => {
    console.log({route, jumpTo})
    switch (route.key) {
      case "profile":
        return <Profile jumpTo={jumpTo} navigation={this.props.navigation} />;
      case "enroll":
        return <AddEntry jumpTo={jumpTo} navigation={this.props.navigation} />;
      case "userRequest":
        return <UserRequest navigation={this.props.navigation} jumpTo={jumpTo} />;
      case "userTask":
        return <UserTask jumpTo={jumpTo}  navigation={this.props.navigation}/>;
    }
  };
  
  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this.renderScene}
        theme={this.props.theme}
        style={styles.bottomNavigationStyle}
      />
    );
  }
}
const mapStateToProps = state => ({
  userProfile: state.userProfile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadLocalWifiIndicators,
    syncWifiIndicators
  }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
