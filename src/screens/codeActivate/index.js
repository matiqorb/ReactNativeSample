import React, { Component } from "react";
import { Keyboard, View } from "react-native";

import { Appbar, Button, Text, withTheme } from "react-native-paper";
import { Container, Icon, Content } from "../../components";
import { AppConstants } from "../../helper/constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  verifyActivationCode,
  requestSMSCode
} from "../../redux/actions/authentication";
import ActivaCodeForm from "./activeCodeForm";
import styles from "./styles";

class CodeActivate extends Component {
  static timerId = null;
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      codeNumber: ""
    };
  }
  componentWillMount() {
    this.startTimer();
  }
  componentDidMount() {}
  startTimer() {
    let that = this;
    this.setState({ timer: 60 });
    this.timerId = setInterval(function() {
      if (that.state.timer > 0) that.setState({ timer: that.state.timer - 1 });
      else clearInterval(that.timerId);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  onPressChangeNumber = () => {
    this.props.navigation.navigate("Register");
  };
  validateCode = activeCode => {
    Keyboard.dismiss();
    this.props
      .verifyActivationCode(this.props.userProfile.phoneNumber, activeCode)
      .then(Response => {
        if (Response) this.props.navigation.navigate("ClientType");
      });
  };
  resendCode = () => {
    this.props
      .requestSMSCode(this.props.userProfile.phoneNumber)
      .then(response => {
        if (response) {
          this.startTimer();
        }
      });
  };
  render() {
    const { asyncTaskIndicator, theme } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={{ paddingHorizontal: 0}}>
          <ActivaCodeForm
            onSubmit={form => {
              console.log("OnSubmite:", form);
              this.validateCode(form.activationCode);
            }}
            isLoading={asyncTaskIndicator.includes("verifyActivationCode")}
            phoneNumber={this.props.userProfile.phoneNumber}
          />
          <Button
            mode="contained"
            disabled={this.state.timer > 0}
            onPress={this.resendCode}
            loading={asyncTaskIndicator.includes("requestSMSCode")}
            style={{margin: 50}}
          >
            <Text style={{ color: this.state.timer ? "black" : "white" }}>
              {" "}
            </Text>
          </Button>

          <Button
            style={{ margin: 50 }}
            mode="outlined"
            onPress={this.onPressChangeNumber}
          >
          </Button>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userProfile: state.userProfile,
  asyncTaskIndicator: state.asyncTaskIndicator
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      requestSMSCode: requestSMSCode,
      verifyActivationCode: verifyActivationCode
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(CodeActivate));
